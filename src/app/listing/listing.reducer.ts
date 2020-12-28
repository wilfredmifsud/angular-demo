import { state } from '@angular/animations';
import { createReducer, on, Action } from '@ngrx/store';
import { listingDetailPage, listingRefetchSuccess } from './listing.actions';

import { Currency, ListingState } from './listing.model';

export const initialState: ListingState = {
  editId: undefined,
  list: []
};

export const listingReducer = createReducer(
  initialState,
  on(listingDetailPage, (state, data: {payload: number }) => ({
    ...state,
    editId: data.payload
  })),
  on(listingRefetchSuccess, (state, data: {payload: Currency[]}) => ({
    ...state,
    list: [...state.list, ...data.payload]
  })),
);
