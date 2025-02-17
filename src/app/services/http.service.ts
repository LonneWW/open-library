import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getBooksList(subjectEndpoint: string, page = 0) {
    let query: string;
    if (page >= 1) {
      query = `?offset=${page * 12}`;
    } else {
      query = '';
    }
    return this.http.get(subjectEndpoint + '.json' + `${query}`);
  }

  getBookDetails(key: string) {
    return this.http.get(`${environment.apiEndPoint}` + `${key}.json`);
  }
}
