import { createReducer, on } from "@ngrx/store";
import { Coin } from "../listing/listing.model";
import { loginSuccess, logout, toggleFavoriteCoin } from "./auth.actions";
import { AuthState, AuthUserProfile } from "./auth.model";

// this is just for demo purposes only
export const initialState: AuthState = {
	user:
		(JSON.parse(
			`${localStorage.getItem("profile") || ""}`
		) as AuthUserProfile) || null,
	favorite:
		(JSON.parse(`${localStorage.getItem("favorite") || ""}`) as string[]) ||
		[]
};

export const authReducer = createReducer(
	initialState,
	on(loginSuccess, (state, data: { payload: AuthUserProfile }) => ({
		...state,
		user: data.payload
	})),
	on(logout, (state) => ({
		...state,
		user: null
	})),
	on(toggleFavoriteCoin, (state, data: { payload: Coin }) => {
		const index = state.favorite.findIndex((x) => x === data.payload.id);
		let updatedState: AuthState;
		if (index > -1) {
			// remove from favorites
			const updatedCoins = [...state.favorite];
			updatedCoins.splice(index, 1);
			updatedState = {
				...state,
				favorite: updatedCoins
			};
		} else {
			// add to favorites
			updatedState = {
				...state,
				favorite: [...state.favorite, data.payload.id]
			};
		}

		localStorage.setItem("favorite", JSON.stringify(updatedState.favorite));
		return updatedState;
	})
);
