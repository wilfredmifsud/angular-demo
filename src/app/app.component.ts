import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { listingActions } from './listing/listing.actions';
import { AppState } from './listing/listing.selector';

export interface MenuLinks {
  title: string;
  url: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'MyCrypto';
  refetch$$ = Subscription.EMPTY;
  links: MenuLinks[] = [
    {
      title: 'home',
      url: '/',
    },
    {
      title: 'News',
      url: '/news',
    },
    {
      title: 'coins',
      url: '/coins',
    },
  ];

  constructor(private router: Router, private store: Store<AppState>) {
    this.refetch$$ = timer(0, 300000)
      .pipe(
        tap(() => this.store.dispatch({ type: listingActions.refetch }))
      )
      .subscribe();
  }

  onRouteChange(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    this.refetch$$.unsubscribe();
  }
}
