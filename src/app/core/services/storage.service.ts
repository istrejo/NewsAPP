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
  get getLocalArticles() {
    return [...this._localArticles];
  }

  // Método para iniciar el storage
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  // Guarda o remueve el articulo en favoritos
  async saveOrRemoveArticle(article: Article) {
    const existArticle = this._localArticles.find(
      (localArticle) => localArticle.title === article.title
    );
    let added: boolean = false;

    if (existArticle) {
      this._localArticles = this._localArticles.filter(
        (localArticle) => localArticle.title !== article.title
      );
      added = false;
    } else {
      this._localArticles = [article, ...this._localArticles];
      added = true;
    }

    this._storage.set('articles', this._localArticles);
    return added;
  }

  // Método para cargar los favoritos
  async loadFavorites() {
    try {
      const articles = await this._storage.get('articles');
      this._localArticles = articles || [];
    } catch (error) {}
  }

  // Evualua si un articulo está en favoritos
  articleInFavorite(article: Article) {
    return !!this._localArticles.find(
      (localArticle) => localArticle.title === article.title
    );
  }
}
