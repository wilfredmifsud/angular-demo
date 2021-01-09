import {
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	Optional,
	Renderer2,
	ViewEncapsulation
} from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { AppState } from "src/app/app.model";
import { sharedActions } from "../shared.actions";
import { getNotification } from "../shared.selector";
import { APP_TOAST_CONFIG, DEFAULT_APP_TOAST_CONFIG } from "./toast.const";
import { AppToastConfig, ToastPosition, ToastType } from "./toast.model";

@Component({
	selector: "app-toast",
	templateUrl: "./toast.component.html",
	styleUrls: ["./toast.component.scss"],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: "app-toast"
	}
})
export class ToastComponent implements OnDestroy {
	notification$ = this.store.select(getNotification);
	message!: string | undefined;

	get position(): ToastPosition {
		return this._position;
	}
	set position(value: ToastPosition) {
		if (this._position) {
			this.renderer.removeClass(
				this.el.nativeElement,
				`app-toast--position-${this._position}`
			);
		}
		this.renderer.addClass(
			this.el.nativeElement,
			`app-toast--position-${value}`
		);
		this._position = value;
	}

	get type(): ToastType {
		return this._type;
	}
	set type(value: ToastType) {
		if (this._type) {
			this.renderer.removeClass(
				this.el.nativeElement,
				`app-toast--type-${this._type}`
			);
		}
		this.renderer.addClass(
			this.el.nativeElement,
			`app-toast--type-${value}`
		);
		this._type = value;
	}

	private _type!: ToastType;
	private _position!: ToastPosition;
	private notification$$ = Subscription.EMPTY;

	constructor(
		@Optional() @Inject(APP_TOAST_CONFIG) private config: AppToastConfig,
		private store: Store<AppState>,
		private renderer: Renderer2,
		private el: ElementRef<HTMLElement>
	) {
		this.notification$$ = this.notification$
			.pipe(
				filter((x) => !!x),
				tap((x) => {
					this.message = x?.message;
					this.type =
						x?.type ||
						this.config?.type ||
						DEFAULT_APP_TOAST_CONFIG.type;
					this.position =
						x?.position ||
						this.config?.position ||
						DEFAULT_APP_TOAST_CONFIG.position;
				})
			)
			.subscribe();
	}

	ngOnDestroy() {
		this.notification$$.unsubscribe();
	}

	close() {
		this.store.dispatch({ type: sharedActions.resetNotification });
	}
}
