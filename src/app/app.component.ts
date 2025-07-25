import { Component, OnInit } from '@angular/core';
import { PdfConverterService, ConversionProgress } from './services/pdf-converter.service';
import { FileItem } from './components/file-list/file-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeTab = 'convert';
  files: FileItem[] = [];
  progress = 0;
  showProgress = false;
  status = '';
  statusType: 'success' | 'error' | '' = '';

  constructor(private pdfConverterService: PdfConverterService) {}

  ngOnInit() {
    // 监听转换进度
    this.pdfConverterService.progress$.subscribe((progress: ConversionProgress) => {
      this.progress = progress.progress;
      this.status = progress.status;
      this.showProgress = progress.progress > 0 && progress.progress < 100;
      
      if (progress.downloadUrl) {
        this.statusType = 'success';
        this.status = '转换成功！';
      } else if (progress.error) {
        this.statusType = 'error';
        this.status = '转换失败，请重试。';
      }
    });
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  onFilesSelected(files: File[]) {
    // 添加新文件到列表
    const newFileItems: FileItem[] = files.map(file => ({
      file: file,
      status: 'pending'
    }));
    
    this.files = [...this.files, ...newFileItems];
  }

  onRemoveFile(index: number) {
    this.files.splice(index, 1);
  }

  onConvertFiles() {
    const pendingFiles = this.files.filter(f => f.status === 'pending');
    
    if (pendingFiles.length === 0) return;

    // 开始转换每个文件
    pendingFiles.forEach((fileItem, index) => {
      fileItem.status = 'converting';
      
      this.pdfConverterService.convertPdfToWord(fileItem.file).subscribe({
        next: (response) => {
          if (response.ok) {
            fileItem.status = 'completed';
            fileItem.downloadUrl = window.URL.createObjectURL(response.body);
          } else {
            fileItem.status = 'error';
            fileItem.error = response.message;
          }
        },
        error: (error) => {
          fileItem.status = 'error';
          fileItem.error = error.message;
          console.error('转换失败:', error);
        }
      });
    });
  }
} 