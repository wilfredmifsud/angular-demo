import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.model";
import { sharedActions } from "../shared.actions";
import { getNotification } from "../shared.selector";
import { ToastPosition, ToastType } from "./toast.model";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-toast'
    }
})
export class ToastComponent {

    notification$ = this.store.select(getNotification);

    @Input() message!: string;
    @Input() type: ToastType = ToastType.info;
    @Input() position: ToastPosition = ToastPosition.bottomRight;

    constructor(private store: Store<AppState>) {
    }

    close() {
        debugger;
        this.store.dispatch({ type: sharedActions.resetNotification });
    }
}