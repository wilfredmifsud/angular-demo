import * as _ from "lodash";
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { AppState } from "../app.model";
import { Coin } from "./listing.model";
import { getAllListing } from "./listing.selector";

@Component({
	selector: "app-listing",
	templateUrl: "./listing.component.html",
	styleUrls: ["./listing.component.scss"],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: "app-listing"
	}
})
export class ListingComponent implements OnInit, OnDestroy {
	items!: Coin[];
	isLoaded = false;

	private items$$ = Subscription.EMPTY;

	constructor(private store: Store<AppState>) {

	}

	ngOnInit() {
		this.items$$= this.store.select(getAllListing).pipe(
			filter(x => !_.isEmpty(x)),
			tap(x => this.items = x),
			tap(() => this.isLoaded = true),
		).subscribe();
	}

	ngOnDestroy() {
		this.items$$.unsubscribe();
	}
}
