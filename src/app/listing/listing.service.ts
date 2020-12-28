import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe } from "rxjs";
import { map } from "rxjs/operators";

import { Coin } from "./listing.model";

@Injectable({
	providedIn: "root"
})
export class ListingService {

  constructor(
    private http: HttpClient
    ) { }

    getAll$(page = 1, limit = 20): Observable<Coin[]> {
      const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('page', `${page}`)
      .set('per_page', `${limit}`);

      return this.http.get<Coin[]>("https://api.coingecko.com/api/v3/coins/markets", {
        params: params
      });
    }

    get$(id: number): Observable<Coin> {
      return this.http.get<Coin>(`http://localhost:3000/posts/${id}`);
    }

    update$(data: Coin): Observable<Coin> {
      return this.http.patch<Coin>(`http://localhost:3000/posts/${data.id}`, data);
    }
}
