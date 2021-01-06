import { InjectionToken } from "@angular/core";
import { AppToastConfig, ToastPosition, ToastType } from "./toast.model";

export const APP_TOAST_CONFIG = new InjectionToken<AppToastConfig>('APP_TOAST_CONFIG');

export const DEFAULT_APP_TOAST_CONFIG: Required<AppToastConfig> = {
    position: ToastPosition.bottomRight,
    type: ToastType.info
}
