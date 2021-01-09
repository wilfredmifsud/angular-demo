import { createAction, props } from "@ngrx/store";
import { ToastNotification } from "./toast/toast.model";

export const sharedActions = {
	setNotification: "[Shared] Set Notification",
	resetNotification: "[Shared] Reset Notification"
};

export const setNotification = createAction(
	sharedActions.setNotification,
	props<{ payload: ToastNotification }>()
);

export const resetNotification = createAction(sharedActions.resetNotification);
