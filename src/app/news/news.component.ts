import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { News } from './news.model';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  host: {
    class: 'app-news',
  },
})
export class NewsComponent {

  items: News[] = [];

  constructor(
    private newsService: NewsService
  ) {
   this.newsService.getAll$().pipe(
      tap(x => this.items = x)
    ).subscribe();

  }
}
