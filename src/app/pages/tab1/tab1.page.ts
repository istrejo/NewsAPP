import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/core/interfaces/news.interface';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;
  articles: Article[] = [];

  selectedCategory: string = 'business';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        this.articles = [...articles];
      });
    // this.newsService.getTopHeadlines().subscribe((articles) => {
    //   // console.log(articles);
    //   this.articles.push(...articles);
    // });
  }

  loadData() {
    this.newsService
      .getTopHeadlinesByCategory('business', true)
      .subscribe((articles) => {
        if (articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          return;
        }

        this.articles = articles;
        this.infiniteScroll.complete();
      });
  }
}
