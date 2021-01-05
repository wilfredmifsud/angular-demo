import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.model';
import { Coin } from './listing.model';
import { getAllListing } from './listing.selector';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  host: {
    class: 'app-listing',
  },
})
export class ListingComponent {
  items: Coin[] = [];
  items$ = this.store.select(getAllListing);
  editId!: number;

  constructor(private store: Store<AppState>) {

  }
}
