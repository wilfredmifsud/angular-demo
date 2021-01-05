import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.model";
import { resetNotification, setNotification, sharedActions } from "../shared.actions";
import { ToastType } from "./toast.model";

@Injectable({
    providedIn: "root"
})
export class ToastService {

    constructor(private store: Store<AppState>) {

    }

    setMessage(message: string, type?: ToastType) {
        this.store.dispatch({
            type: sharedActions.setNotification, payload: {
                message,
                type
            }
        });
    }

    reset() {
        this.store.dispatch({ type: sharedActions.resetNotification });
    }
}
