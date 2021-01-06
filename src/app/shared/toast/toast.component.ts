import * as _ from "lodash";
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, Renderer2, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { distinctUntilChanged, tap } from "rxjs/operators";
import { AppState } from "src/app/app.model";
import { sharedActions } from "../shared.actions";
import { getNotification } from "../shared.selector";
import { APP_TOAST_CONFIG, DEFAULT_APP_TOAST_CONFIG } from "./toast.const";
import { AppToastConfig, ToastPosition, ToastType } from "./toast.model";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-toast'
    }
})
export class ToastComponent implements OnInit, OnDestroy {

    notification$ = this.store.select(getNotification);
    message!: string | undefined;
    type!: ToastType;
    position!: ToastPosition;

    private notification$$ = Subscription.EMPTY;

    constructor(
        @Optional() @Inject(APP_TOAST_CONFIG) private config: AppToastConfig,
        private store: Store<AppState>,
        private renderer: Renderer2,
        private el: ElementRef<HTMLElement>
    ) {
        this.notification$$ = this.notification$.pipe(
            distinctUntilChanged(_.isEqual),
            tap(x => {
                this.message = x?.message;
                this.type = x?.type || this.config?.type || DEFAULT_APP_TOAST_CONFIG.type;
                this.position = x?.position || this.config?.position || DEFAULT_APP_TOAST_CONFIG.position;
            })
        ).subscribe();
    }

    ngOnInit() {
        // todo: this should be changed when setting the inputs and updated (not just one time)
        this.renderer.addClass(this.el.nativeElement, `app-toast--position-${this.position}`);
        this.renderer.addClass(this.el.nativeElement, `app-toast--type-${this.type}`);
    }

    ngOnDestroy() {
        this.notification$$.unsubscribe();
    }

    close() {
        this.store.dispatch({ type: sharedActions.resetNotification });
    }
}