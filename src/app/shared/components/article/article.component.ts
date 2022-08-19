import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/core/interfaces/news.interface';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;

  constructor(private iab: InAppBrowser, private platform: Platform) {}

  ngOnInit() {}

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);

      browser.show();
    }
    window.open(this.article.url, '_blank');
  }

  onClick() {}
}
