import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getBooksList(subject: string) {
    return this.http.get(`${environment.apiEndPoint}/subjects/${subject}.json`);
  }

  getBookDetails(key: string) {
    return this.http.get(`${environment.apiEndPoint}/works/${key}.json`);
  }
}
