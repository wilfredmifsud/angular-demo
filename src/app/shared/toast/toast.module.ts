import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import { APP_TOAST_CONFIG, DEFAULT_APP_TOAST_CONFIG } from './toast.const';
import { AppToastConfig } from './toast.model';

export const TOAST_LIST = [
    ToastComponent
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...TOAST_LIST,
    ],
    exports: [
        ...TOAST_LIST,
    ],
})
export class ToastModule {

    static forRoot(conf?: AppToastConfig): ModuleWithProviders<ToastModule> {
        return {
            ngModule: ToastModule,
            providers: [{ provide: APP_TOAST_CONFIG, useValue: {...DEFAULT_APP_TOAST_CONFIG, ...conf} }]
        }
    }

}