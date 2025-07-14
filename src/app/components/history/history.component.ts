import { Component } from '@angular/core';

export interface HistoryItem {
  id: string;
  fileName: string;
  status: 'completed' | 'failed';
  downloadUrl?: string;
  createdAt: Date;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  historyItems: HistoryItem[] = [
    {
      id: '1',
      fileName: '报告.pdf',
      status: 'completed',
      downloadUrl: '/downloads/report.docx',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      fileName: '资料.pdf',
      status: 'completed',
      downloadUrl: '/downloads/materials.docx',
      createdAt: new Date('2024-01-14')
    },
    {
      id: '3',
      fileName: '失败案例.pdf',
      status: 'failed',
      createdAt: new Date('2024-01-13')
    }
  ];

  getStatusText(status: string): string {
    return status === 'completed' ? '已完成' : '失败';
  }

  getStatusColor(status: string): string {
    return status === 'completed' ? '#28a745' : '#e74c3c';
  }
} 