import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './components/articles/articles.component';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './components/article/article.component';

const components = [ArticlesComponent, ArticleComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, IonicModule],
  exports: [ArticlesComponent],
})
export class SharedModule {}
