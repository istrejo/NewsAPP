import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/core/interfaces/news.interface';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getTopHeadlines().subscribe((articles) => {
      console.log(articles);
      this.articles.push(...articles);
    });
  }
}
