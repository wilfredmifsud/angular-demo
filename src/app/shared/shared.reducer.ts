import { createReducer, on } from "@ngrx/store";
import { resetNotification, setNotification } from "./shared.actions";

import { SharedState } from "./shared.model";
import { ToastNotification } from "./toast/toast.model";

export const initialState: SharedState = {
	notification: null
};

export const sharedReducer = createReducer(
	initialState,
	on(setNotification, (state, data: { payload: ToastNotification }) => ({
		...state,
		notification: data.payload
	})),
	on(resetNotification, (state) => ({
		...state,
		notification: null
	}))
);
