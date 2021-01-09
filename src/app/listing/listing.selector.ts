import { createSelector } from "@ngrx/store";
import { AppState } from "../app.model";

export const listingState = (state: AppState) => state.listing;

export const getAllListing = createSelector(
	listingState,
	(state) => state.list
);
