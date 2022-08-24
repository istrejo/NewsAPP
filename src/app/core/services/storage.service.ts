import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async saveOrRemoveArticle(article: Article) {
    const existArticle = this._localArticles.find(
      (localArticle) => localArticle.title === article.title
    );

    if (existArticle) {
      this._localArticles = this._localArticles.filter(
        (localArticle) => localArticle.title !== article.title
      );
    } else {
      this._localArticles = [article, ...this._localArticles];
    }

    this._storage.set('articles', this._localArticles);
  }

  // Create and expose methods that users of this service can
  // call, for example:
  // public set(key: string, value: any) {
  //   this._storage?.set(key, value);
  // }
}
