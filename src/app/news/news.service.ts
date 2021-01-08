import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { News } from "./news.model";

@Injectable({
  providedIn: "root"
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll$(): Observable<News[]> {
    const articles: News[] = [{
      author: "John Know",
      description: "Sample subtitle for news article",
      publishedAt: "2020-01-01 19:00:00",
      title: "Crypto sky rockets!",
      url: "http://marketwatch.com",
      urlToImage: "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDEvZDhjOWQ1ZmUtYzI3MS00YjViLTk2ZDMtZWMxNTkxZDAzNTQ3LmpwZw==.jpg"
    }, {
      author: "John Know",
      description: "Sample subtitle for news article",
      publishedAt: "2020-01-01 19:00:00",
      title: "Bitcoin breaks 40K USD, Where is it heading?",
      url: "http://marketwatch.com",
      urlToImage: "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy8zODI1MDU0NjJmMGUwMjcwM2NiMmJkNzJhNmM5YmI4Ny5qcGc=.jpg"
    }, {
      author: "John Know",
      description: "Sample subtitle for news article",
      publishedAt: "2020-01-01 19:00:00",
      title: "Malta, Blockchain island.... is it?",
      url: "http://marketwatch.com",
      urlToImage: "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjAtMTAvNTk0MDYwMzEtNjI1NC00NzNiLWJmMmUtY2MwOTliNjQxM2ZmLmpwZw==.jpg"
    }];

    return of(articles);
  }
}
