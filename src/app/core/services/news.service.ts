import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const apiKey: string = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getTopHeadlines() {
    return this.http.get<any[]>(
      `https://newsapi.org/v2/top-headlines?country=us&category=business`,
      {
        params: {
          apiKey: apiKey,
        },
      }
    );
  }
}
