export enum ToastType {
    error = "error",
    success = "success",
    info = "info"
} 

export enum ToastPosition {
    bottomRight = "bottom-right",
    bottomleft = "bottom-left",
    bottomCenter = "bottom-center",
    topLeft = "top-left",
    topRight = "top-right",
    topCenter = "top-center"
} 

export interface ToastNotification {
    message: string;
    type?: ToastType;
    position?: ToastPosition
}

export interface AppToastConfig {
    position?: ToastPosition;
    type?: ToastType
}
