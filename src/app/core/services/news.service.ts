import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  Article,
  ArticlesByCategoryAndPage,
  NewsResponse,
} from '../interfaces/news.interface';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey: string = environment.apiKey;
const apiUrl: string = 'https://newsapi.org/v2';
// const endpoint: string = '/top-headlines?category=business'

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) {}

  private executeQuery<T>(endpoint: string) {
    console.log('Petición realizada');
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey,
        country: 'us',
      },
    });
  }

  getTopHeadlines(): Observable<Article[]> {
    return this.executeQuery<NewsResponse>(
      '/top-headlines?category=business'
    ).pipe(map(({ articles }) => articles));
  }

  getTopHeadlinesByCategory(
    category: string,
    loadMore: boolean = false
  ): Observable<Article[]> {
    return this.http
      .get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us`, {
        params: {
          category,
          apiKey,
        },
      })
      .pipe(map(({ articles }) => articles));
  }

  private getArticlesByCAtegory(category: string): Observable<Article[]> {
    if (Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      //Ya existe
    } else {
      // No existe
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(
      `/top-headlines?category=${category}&page=${page}`
    ).pipe(map(({ articles }) => articles));
  }
}
