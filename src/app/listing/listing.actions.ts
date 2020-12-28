import { createAction, props } from '@ngrx/store';
import { Currency } from './listing.model';


export const listingActions = {
    detail:  '[Listing] Detail Page',
    refetch:  '[Listing] Refetch',
    refetchError: '[Listing] Refetch Error',
    refetchSuccess: '[Listing] Refetch Success',
    getItem: '[Listing] Refetch Item',
    updateItem: '[Listing] Update Item',
    updateItemSucces: '[Listing] Update Item Success',
    updateItemError: '[Listing] Update Item Error'
};

export const listingDetailPage = createAction(
  listingActions.detail, props<{payload: number}>()
);

export const listingRefetch = createAction(
  listingActions.refetch
);

export const listingRefetchError = createAction(
  listingActions.refetchError
);

export const listingRefetchSuccess = createAction(
  listingActions.refetchSuccess, props<{payload: Currency[]}>()
);

export const listingRefetchItem = createAction(
  listingActions.getItem, props<{payload: Currency}>()
);

export const listingUpdateItem = createAction(
  listingActions.updateItem, props<{payload: Currency}>()
);

export const listingUpdateItemSuccess = createAction(
  listingActions.updateItemSucces
);

export const listingUpdateItemError = createAction(
  listingActions.updateItemError
);


