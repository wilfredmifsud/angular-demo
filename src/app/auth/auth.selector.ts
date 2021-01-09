import { createSelector } from "@ngrx/store";

import { AppState } from "../app.model";

export const authState = (state: AppState) => state.auth;

export const isLoggedIn = createSelector(authState, (state) => state.user);

export const coinFavorites = createSelector(
	authState,
	(state) => state.favorite
);
