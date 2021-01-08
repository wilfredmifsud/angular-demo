import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState } from './app.model';

import { listingActions } from './listing/listing.actions';
import { NAVIGATION_LINKS } from './navigation/navigation.const';

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

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  title = 'MyCrypto';
  sideNavOpened: boolean = false;
  links = NAVIGATION_LINKS;

  private refetch$$ = Subscription.EMPTY;
  private routeChange$$ = Subscription.EMPTY;

  constructor(
    private store: Store<AppState>,
    private router: Router
    ) {
    this.refetch$$ = timer(0, 30000) // poll every 30 seconds
      .pipe(
        tap(() => this.store.dispatch({ type: listingActions.refetch }))
      ).subscribe();

      this.routeChange$$ = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if(this.sidenav)
           this.sidenav.close();
        }
    });

  }

  ngOnDestroy() {
    this.refetch$$.unsubscribe();
    this.routeChange$$.unsubscribe();
  }
}
