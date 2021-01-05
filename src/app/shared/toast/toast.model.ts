export enum ToastType {
    error = "error",
    success = "success",
    info = "info"
} 

export enum ToastPosition {
    bottomRight = "bottom-right",
    bottomleft = "bottom-left",
    topLeft = "top-left",
    topRight = "top-right"
} 

export interface ToastNotification {
    message: string;
    type?: ToastType;
    position?: ToastPosition
}