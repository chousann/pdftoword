import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ConversionProgress {
  progress: number;
  status: string;
  downloadUrl?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfConverterService {
  private apiUrl = 'http://localhost:3000/api';
  private progressSubject = new BehaviorSubject<ConversionProgress>({ progress: 0, status: '' });
  public progress$ = this.progressSubject.asObservable();

  constructor(private http: HttpClient) {}

  convertPdfToWord(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('pdf', file);

    return this.http.post(`${this.apiUrl}/convert`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const uploadProgress = Math.round(100 * event.loaded / (event.total || 1));
            this.progressSubject.next({ 
              progress: uploadProgress * 0.5, 
              status: '上传中...' 
            });
            return event;

          case HttpEventType.Response:
            if (event.body) {
              this.progressSubject.next({ 
                progress: 100, 
                status: '转换完成',
                downloadUrl: event.body.downloadUrl 
              });
            }
            return event.body;

          default:
            return event;
        }
      })
    );
  }

  getConversionHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history`);
  }

  downloadFile(downloadUrl: string): Observable<Blob> {
    return this.http.get(downloadUrl, { responseType: 'blob' });
  }

  updateProgress(progress: number, status: string) {
    this.progressSubject.next({ progress, status });
  }
} 