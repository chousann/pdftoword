const express = require('express');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { Document, Packer, Paragraph, TextRun } = require('docx');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
// 不在 Vercel 上使用本地静态上传/下载目录（Vercel 文件系统为只读）

var buffer;
var wordFileName;
var wordPath;

// 配置文件上传：使用内存存储，避免写入磁盘（适配 Vercel 只读文件系统）
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('只支持PDF文件'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB限制
  }
});

// 不依赖本地下载目录（Vercel 上不可写）
const downloadDir = 'downloads';

// 转换历史存储
let conversionHistory = [];

// API路由
app.post('/api/convert', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '没有上传文件' });
    }

    const originalName = req.file.originalname || 'file.pdf';
    const fileName = originalName.replace(/\.pdf$/i, '').replace(/[^a-z0-9-_]/gi, '_');

    console.log(`开始转换文件: ${fileName}`);

    // 从内存读取PDF文件
    const pdfBuffer = req.file.buffer;
    
    // 解析PDF内容
    const pdfData = await pdfParse(pdfBuffer);
    const text = pdfData.text;

    // 创建Word文档
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: text,
                size: 24,
                font: 'Arial'
              })
            ]
          })
        ]
      }]
    });

    // 生成Word文件
    buffer = await Packer.toBuffer(doc);
    wordFileName = `${fileName}.docx`;
    // 直接返回生成的 docx 二进制（不写入磁盘），为浏览器下载设置正确的文件名
    res.status(200)
      .contentType('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      .setHeader('Content-Disposition', `attachment; filename="${wordFileName}"`)
      .send(buffer);

    // // 记录转换历史
    // const historyItem = {
    //   id: Date.now().toString(),
    //   originalName: req.file.originalname,
    //   fileName: wordFileName,
    //   status: 'completed',
    //   downloadUrl: `/downloads/${wordFileName}`,
    //   createdAt: new Date()
    // };
    
    // conversionHistory.unshift(historyItem);

    // // 清理上传的PDF文件
    // fs.unlinkSync(pdfPath);

    // console.log(`转换完成: ${wordFileName}`);
    
    // res.json({
    //   success: true,
    //   message: '转换成功',
    //   downloadUrl: `/downloads/${wordFileName}`,
    //   fileName: wordFileName
    // });

  } catch (error) {
    console.error('转换失败:', error);
    
    // 记录失败历史
    const historyItem = {
      id: Date.now().toString(),
      originalName: req.file?.originalname || 'unknown',
      status: 'failed',
      error: error.message,
      createdAt: new Date()
    };
    
    conversionHistory.unshift(historyItem);

    res.status(500).json({
      success: false,
      error: '转换失败',
      message: error.message
    });
  }
});

// 获取转换历史
app.get('/api/history', (req, res) => {
  res.json(conversionHistory.slice(0, 20)); // 只返回最近20条记录
});

// 下载文件
app.get('/downloads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(downloadDir, filename);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: '文件不存在' });
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 错误处理中间件
app.use((error, req, res, next) => {
  console.error('服务器错误:', error);
  res.status(500).json({
    error: '服务器内部错误',
    message: error.message
  });
});

if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`PDF转Word服务器运行在端口 ${PORT}`);
    console.log(`API地址: http://localhost:${PORT}/api`);
  });
} 