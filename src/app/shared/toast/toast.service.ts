import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "../../app.model";
import { sharedActions } from "../shared.actions";

import { ToastPosition, ToastType } from "./toast.model";

@Injectable({
	providedIn: "root"
})
export class ToastService {
	constructor(private store: Store<AppState>) {}

	setMessage(message: string, type: ToastType, position?: ToastPosition) {
		this.store.dispatch({
			type: sharedActions.setNotification,
			payload: {
				message,
				type,
				position
			}
		});
	}

	reset() {
		this.store.dispatch({ type: sharedActions.resetNotification });
	}
}
