import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppMenuLinks, AppState } from './app.model';
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
  links: AppMenuLinks[] = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'News',
      url: '/news',
    },
    {
      title: 'Coins',
      url: '/coins',
    },
  ];

  private refetch$$ = Subscription.EMPTY;

  constructor(private router: Router, private store: Store<AppState>) {
    this.refetch$$ = timer(0, 30000) // poll every 30 seconds
      .pipe(
        tap(() => this.store.dispatch({ type: listingActions.refetch }))
      ).subscribe();
  }

  onRouteChange(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    this.refetch$$.unsubscribe();
  }
}
