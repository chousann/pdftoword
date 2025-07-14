import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface FileItem {
  file: File;
  status: 'pending' | 'converting' | 'completed' | 'error';
  progress?: number;
  downloadUrl?: string;
  error?: string;
}

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent {
  @Input() files: FileItem[] = [];
  @Output() removeFile = new EventEmitter<number>();
  @Output() convertFiles = new EventEmitter<void>();

  onRemoveFile(index: number) {
    this.removeFile.emit(index);
  }

  onConvertFiles() {
    this.convertFiles.emit();
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending': return '待转换';
      case 'converting': return '转换中';
      case 'completed': return '已完成';
      case 'error': return '转换失败';
      default: return '未知状态';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return '#28a745';
      case 'error': return '#e74c3c';
      default: return '#888';
    }
  }

  get isConvertDisabled(): boolean {
    return !this.files || this.files.length === 0 || this.files.every(f => f.status !== 'pending');
  }
} 