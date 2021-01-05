import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { News, NewsRequest } from "./news.model";

@Injectable({
	providedIn: "root"
})
export class NewsService {

  constructor(
    private http: HttpClient
    ) {

    }

    getAll$(): Observable<News[]> {
      return this.http.get<NewsRequest>("http://newsapi.org/v2/everything?q=bitcoin&from=2020-11-28&sortBy=publishedAt&apiKey=46a07df4124c4e4591b0445072f19b87").pipe(
        map(x => x.articles)
      );
    }
}
