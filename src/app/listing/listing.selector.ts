import { createSelector } from "@ngrx/store";
import { ListingState } from "./listing.model";

export interface AppState {
  listing: ListingState;
}


export const listingState = (state: AppState) => state.listing

export const getAllListing = createSelector(
  listingState,
   state => state.list
   );

   export const getListingDetailId = createSelector(
    listingState,
     state => state.editId
     );
