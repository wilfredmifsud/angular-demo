import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Coin } from "./listing.model";

@Injectable({
	providedIn: "root"
})
export class ListingService {
	constructor(private http: HttpClient) {}

	getAll$(page = 1, limit = 200): Observable<Coin[]> {
		const params = new HttpParams()
			.set("vs_currency", "usd") // todo: change currency
			.set("order", "market_cap_desc")
			.set("page", `${page}`)
			.set("cache_bust", `${Math.round(new Date().getTime() / 1000)}`)
			.set("per_page", `${limit}`);

		return this.http.get<Coin[]>(
			"https://api.coingecko.com/api/v3/coins/markets",
			{
				params
			}
		);
	}
}
