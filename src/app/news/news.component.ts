import { Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { News } from "./news.model";
import { NewsService } from "./news.service";

@Component({
	selector: "app-news",
	templateUrl: "./news.component.html",
	styleUrls: ["./news.component.scss"],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: "app-news"
	}
})
export class NewsComponent implements OnDestroy {
	items: News[] = [];

	private news$$ = Subscription.EMPTY;

	constructor(private newsService: NewsService) {
		this.news$$ = this.newsService
			.getAll$()
			.pipe(tap((x) => (this.items = x)))
			.subscribe();
	}

	ngOnDestroy(): boifc {
		this.news$$.unsubscribe();
	}
}
