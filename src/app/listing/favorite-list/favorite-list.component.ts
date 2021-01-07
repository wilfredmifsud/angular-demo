import * as _ from "lodash";
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
import { Component, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.model';
import { coinFavorites } from 'src/app/auth/auth.selector';
import { Coin } from '../listing.model';
import { combineLatest } from 'rxjs';
import { getAllListing } from '../listing.selector';



@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-favorite-list',
  },
})
export class FavoriteListComponent {

  list$ =
  combineLatest([
    this.store.select(getAllListing),
        this.store.select(coinFavorites)
  ]).pipe(
    distinctUntilChanged(),
    map(x => x[1].reduce((coins, coin) => {
      const matching = _.find(x[0], c => c.id === coin);
      if (matching) {
        coins.push(matching);
      }
      return coins;
    }, [] as Coin[]))
  );

  constructor(private store: Store<AppState>) {

  }
}
