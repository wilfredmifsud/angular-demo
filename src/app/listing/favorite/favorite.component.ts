import { distinctUntilChanged, tap } from "rxjs/operators";
import { filter, map } from "rxjs/operators";
import { Component, Input, ViewEncapsulation } from "@angular/core";

import { Store } from "@ngrx/store";
import { AppState } from "../../../app/app.model";
import { authActions } from "../../../app/auth/auth.actions";
import { coinFavorites } from "../../../app/auth/auth.selector";
import { Coin } from "../listing.model";

@Component({
	selector: "app-favorite",
	templateUrl: "./favorite.component.html",
	styleUrls: ["./favorite.component.scss"],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: "app-favorite"
	}
})
export class FavoriteComponent {
	@Input() coin!: Coin;

	isToggledOn = false;
	toggled$ = this.store.select(coinFavorites).pipe(
		distinctUntilChanged(),
		filter(() => !!this.coin),
		map((x) => x.includes(this.coin.id)),
		tap((x) => (this.isToggledOn = x))
	);

	constructor(private store: Store<AppState>) {}

	toggle() {
		if (!this.coin) {
			return;
		}
		this.store.dispatch({
			type: authActions.toggleFavoriteCoin,
			payload: this.coin
		});
	}
}
