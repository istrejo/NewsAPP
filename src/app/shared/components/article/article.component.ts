import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/core/interfaces/news.interface';
import {
  ActionSheetButton,
  ActionSheetController,
  Platform,
} from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { Share } from '@capacitor/share';

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
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {}

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);

      browser.show();
    }
    window.open(this.article.url, '_blank');
  }

  async onOpenMenu() {
    const normalBtns: ActionSheetButton[] = [
      {
        text: 'Favorite',
        icon: 'heart-outline',
        handler: () => this.onToggleFavorite(),
      },
      {
        text: 'cancel',
        icon: 'close-outline',
        role: 'cancel',
      },
    ];

    const shareBtn: ActionSheetButton = {
      text: 'share',
      icon: 'share-outline',
      handler: () => this.onShareArticle(),
    };

    if (this.platform.is('capacitor')) {
      normalBtns.unshift(shareBtn);
    }

    const antionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: normalBtns,
    });

    await antionSheet.present();
  }

  async onShareArticle() {
    await Share.share({
      text: 'Article',
      url: this.article.url,
    });
  }

  onToggleFavorite() {
    console.log('favorite article');
  }
}
