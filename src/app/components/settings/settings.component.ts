import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  settings = {
    preserveLayout: true,
    autoDownload: false,
    notifications: true
  };

  onSettingChange(setting: keyof typeof this.settings) {
    this.settings[setting] = !this.settings[setting];
    // 这里可以保存设置到本地存储或发送到服务器
    localStorage.setItem('pdfToWordSettings', JSON.stringify(this.settings));
  }
} 