import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Coin } from './listing.model';

export const listingActions = {
    refetch:  '[Listing] Refetch',
    refetchError: '[Listing] Refetch Error',
    refetchSuccess: '[Listing] Refetch Success',
    getItem: '[Listing] Refetch Item',
};

export const listingRefetch = createAction(
  listingActions.refetch
);

export const listingRefetchError = createAction(
  listingActions.refetchError
);

export const listingRefetchSuccess = createAction(
  listingActions.refetchSuccess, props<{payload: Coin[]}>()
);

