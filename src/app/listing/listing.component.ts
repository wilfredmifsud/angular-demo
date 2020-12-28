import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { listingActions, listingDetailPage } from './listing.actions';
import { Coin } from './listing.model';
import { AppState, getAllListing, getListingDetailId } from './listing.selector';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  host: {
    class: 'app-listing'
  }
})
export class ListingComponent{

  items: Coin[] = [];
  detail$ = this.store.select(getListingDetailId);
  items$ = this.store.select(getAllListing);
  editId!: number;

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.dispatch({type: listingActions.refetch});
   }

  detail(id: number) {
    this.store.dispatch(listingDetailPage({payload: id} ))
  }

}
