import { createSelector } from "@ngrx/store";
import { AppState } from "../app.model";

export const sharedState = (state: AppState) => state.shared;

export const getNotification = createSelector(
	sharedState,
	(state) => state.notification
);
