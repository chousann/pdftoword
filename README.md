# PDF转Word在线工具

一个基于Angular和Node.js的PDF转Word在线转换工具，提供安全、快速、免费的PDF到Word文档转换服务。

## 功能特性

- 🚀 **快速转换**: 支持批量PDF文件转换
- 🎯 **高质量输出**: 保持原始文档格式和内容
- 🔒 **安全可靠**: 本地处理，文件不上传到第三方服务器
- 📱 **响应式设计**: 支持桌面和移动设备
- 📊 **实时进度**: 显示转换进度和状态
- 📚 **转换历史**: 记录和管理转换历史
- ⚙️ **个性化设置**: 可配置转换选项

## 技术栈

### 前端
- **Angular 16**: 现代化的前端框架
- **TypeScript**: 类型安全的JavaScript
- **Font Awesome**: 图标库
- **RxJS**: 响应式编程

### 后端
- **Node.js**: 服务器运行环境
- **Express**: Web应用框架
- **Multer**: 文件上传处理
- **pdf-parse**: PDF内容解析
- **docx**: Word文档生成
- **CORS**: 跨域资源共享

## 安装和运行

### 前置要求
- Node.js 16+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器

1. **启动后端API服务器**:
```bash
npm run dev:server
```

2. **启动Angular开发服务器**:
```bash
npm start
```

3. **同时启动前后端**:
```bash
npm run dev
```

### 访问应用
- 前端: http://localhost:4200
- 后端API: http://localhost:3000

## 项目结构

```
pdftoword/
├── src/                          # Angular前端源码
│   ├── app/
│   │   ├── components/           # 组件
│   │   │   ├── file-upload/      # 文件上传组件
│   │   │   ├── file-list/        # 文件列表组件
│   │   │   ├── progress-bar/     # 进度条组件
│   │   │   ├── history/          # 历史记录组件
│   │   │   └── settings/         # 设置组件
│   │   ├── services/             # 服务层
│   │   │   └── pdf-converter.service.ts
│   │   └── app.component.*       # 主应用组件
│   ├── styles.css                # 全局样式
│   └── main.ts                   # 应用入口
├── server/                       # Node.js后端
│   └── server.js                 # Express服务器
├── uploads/                      # 上传文件目录
├── downloads/                    # 下载文件目录
├── package.json                  # 项目配置
└── README.md                     # 项目说明
```

## API接口

### 转换PDF
- **POST** `/api/convert`
- **参数**: `pdf` (文件)
- **返回**: 转换结果和下载链接

### 获取历史记录
- **GET** `/api/history`
- **返回**: 转换历史列表

### 下载文件
- **GET** `/downloads/:filename`
- **返回**: 文件下载

### 健康检查
- **GET** `/api/health`
- **返回**: 服务器状态

## 使用说明

1. **上传文件**: 拖拽PDF文件到上传区域或点击选择文件
2. **开始转换**: 点击"开始转换"按钮
3. **查看进度**: 实时查看转换进度
4. **下载结果**: 转换完成后点击下载链接
5. **查看历史**: 在历史标签页查看转换记录
6. **个性化设置**: 在设置标签页配置转换选项

## 开发说明

### 添加新功能
1. 在`src/app/components/`下创建新组件
2. 在`src/app/services/`下添加相关服务
3. 在`server/server.js`中添加API接口
4. 更新`src/app/app.module.ts`注册新组件

### 样式修改
- 全局样式: `src/styles.css`
- 组件样式: 各组件目录下的`.css`文件

### 后端扩展
- 添加新的中间件: `server/server.js`
- 扩展API路由: 在现有路由下添加新端点
- 数据库集成: 可添加MongoDB或MySQL支持

## 部署

### 生产环境构建
```bash
npm run build
```

### 部署到服务器
1. 构建前端: `npm run build`
2. 启动后端: `npm run dev:server`
3. 配置反向代理(如Nginx)
4. 设置环境变量

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 更新日志

### v1.0.0
- 初始版本发布
- 支持PDF转Word转换
- 实现文件上传和下载
- 添加转换历史记录
- 响应式UI设计 