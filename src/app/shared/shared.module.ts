import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastComponent } from './toast/toast.component';

export const SHARED_LIST = [
    ToastComponent
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...SHARED_LIST,
    ],
    exports: [
        ...SHARED_LIST,
    ],
})
export class SharedModule {
}