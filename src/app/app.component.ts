import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState } from './app.model';

import { listingActions } from './listing/listing.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "app"
  }
})
export class AppComponent implements OnDestroy {

  title = 'MyCrypto';


  private refetch$$ = Subscription.EMPTY;

  constructor(private store: Store<AppState>) {
    this.refetch$$ = timer(0, 30000) // poll every 30 seconds
      .pipe(
        tap(() => this.store.dispatch({ type: listingActions.refetch }))
      ).subscribe();
  }

  ngOnDestroy() {
    this.refetch$$.unsubscribe();
  }
}
