import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.model';
import { Coin } from './listing.model';
import { getAllListing } from './listing.selector';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-listing',
  },
})
export class ListingComponent {
  items: Coin[] = [];
  items$ = this.store.select(getAllListing);
  baseCurrencyList = ["usd", "eur"];
  orderList = ["market_cap_desc", "market_cap_asc"];
  pageSize = ["20", "50", "100", "150"];
  filterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      baseCurrency: [this.baseCurrencyList],
      order: [this.orderList],
      pageSize: [this.pageSize],
    });
  }
}
