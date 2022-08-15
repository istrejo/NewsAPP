import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/core/interfaces/news.interface';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public articles: Article[] = [];
  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  selectedCategory: string = this.categories[0];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        this.articles = [...articles];
      });
  }

  segmentChanged(category: any) {
    this.selectedCategory = category.detail.value;
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        // console.log(articles);
        this.articles = [...articles];
      });
  }
}
