import { ToastNotification } from "./toast/toast.model";

export interface SharedState {
	notification: ToastNotification | null;
}
