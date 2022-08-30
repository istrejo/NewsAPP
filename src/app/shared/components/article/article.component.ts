import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/core/interfaces/news.interface';
import {
  ActionSheetButton,
  ActionSheetController,
  Platform,
  ToastController,
} from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { Share } from '@capacitor/share';

import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  openArticle() {
    if (this.platform.is('hybrid')) {
      const browser = this.iab.create(this.article.url);

      browser.show();
    }
    window.open(this.article.url, '_blank');
  }

  async onOpenMenu() {
    const articleInFavorite = this.storageService.articleInFavorite(
      this.article
    );

    const normalBtns: ActionSheetButton[] = [
      {
        text: articleInFavorite ? 'Remove favorite' : 'Favorite',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite(),
      },
      {
        text: 'cancel',
        icon: 'close-outline',
        role: 'cancel',
      },
      {
        text: 'share',
        icon: 'share-outline',
        handler: () => this.onShareArticle(),
      },
    ];

    // const shareBtn: ActionSheetButton = {
    //   text: 'share',
    //   icon: 'share-outline',
    //   handler: () => this.onShareArticle(this.article.url),
    // };

    // if (this.platform.is('capacitor')) {
    // normalBtns.unshift(shareBtn);
    // }

    const antionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: normalBtns,
    });

    await antionSheet.present();
  }

  async onShareArticle() {
    await Share.share({
      title: this.article.title,
      text: 'Article',
      url: this.article.url,
    });
  }

  onToggleFavorite() {
    this.storageService
      .saveOrRemoveArticle(this.article)
      .then((res) => this.presentToast(res));
  }

  async presentToast(res) {
    const toast = await this.toastCtrl.create({
      message: res ? 'added to favorites.' : 'removed from favorites',
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }
}
