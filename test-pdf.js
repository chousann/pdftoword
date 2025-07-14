const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

async function createTestPDF() {
  // 创建PDF文档
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  
  const { width, height } = page.getSize();
  
  // 添加文本
  page.drawText('Test PDF Document', {
    x: 50,
    y: height - 50,
    size: 30,
    color: rgb(0, 0, 0)
  });
  
  page.drawText('This is a sample document for testing PDF to Word conversion.', {
    x: 50,
    y: height - 100,
    size: 14,
    color: rgb(0.2, 0.2, 0.2)
  });
  
  page.drawText('Content includes:', {
    x: 50,
    y: height - 130,
    size: 14,
    color: rgb(0.2, 0.2, 0.2)
  });
  
  page.drawText('• English text test', {
    x: 70,
    y: height - 160,
    size: 12,
    color: rgb(0.3, 0.3, 0.3)
  });
  
  page.drawText('• Number test: 123456789', {
    x: 70,
    y: height - 180,
    size: 12,
    color: rgb(0.3, 0.3, 0.3)
  });
  
  page.drawText('• Special characters: !@#$%^&*()', {
    x: 70,
    y: height - 200,
    size: 12,
    color: rgb(0.3, 0.3, 0.3)
  });
  
  page.drawText('• Multiple lines of text for testing', {
    x: 70,
    y: height - 220,
    size: 12,
    color: rgb(0.3, 0.3, 0.3)
  });
  
  // 保存PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('test-document.pdf', pdfBytes);
  console.log('测试PDF文件已创建: test-document.pdf');
}

createTestPDF().catch(console.error); 