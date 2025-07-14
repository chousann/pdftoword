import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  @Input() progress = 0;
  @Input() show = false;
  @Input() status = '';
  @Input() statusType: 'success' | 'error' | '' = '';
} 