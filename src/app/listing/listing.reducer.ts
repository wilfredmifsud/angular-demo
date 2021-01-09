import { createReducer, on } from "@ngrx/store";
import { listingRefetchSuccess } from "./listing.actions";
import { Coin, ListingState } from "./listing.model";

export const initialState: ListingState = {
	list: []
};

export const listingReducer = createReducer(
	initialState,
	on(listingRefetchSuccess, (state, data: { payload: Coin[] }) => ({
		...state,
		list: data.payload
	}))
);
