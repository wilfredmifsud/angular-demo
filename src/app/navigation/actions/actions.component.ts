import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { SimpleModalService } from "ngx-simple-modal";

import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";

import { AppState } from "src/app/app.model";
import { authActions } from "src/app/auth/auth.actions";
import { AuthUserProfile } from "src/app/auth/auth.model";
import { isLoggedIn } from "src/app/auth/auth.selector";
import { ConfirmComponent } from "src/app/auth/login/login.component";

@Component({
	selector: "app-navigation-actions",
	templateUrl: "./actions.component.html",
	styleUrls: ["./actions.component.scss"],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: "app-navigation-actions"
	}
})
export class ActionsComponent implements OnInit, OnDestroy {
	profile!: AuthUserProfile | null;

	private isLogged$ = this.store.select(isLoggedIn);
	private isLogged$$ = Subscription.EMPTY;
	private openLogin$$ = Subscription.EMPTY;

	constructor(
		private fb: FormBuilder,
		private store: Store<AppState>,
		private simpleModalService: SimpleModalService
	) {}

	ngOnInit() {
		this.isLogged$$ = this.isLogged$
			.pipe(
				tap((x) => {
					if (x?.username) {
						this.profile = x;
						return;
					}
					this.profile = null;
				})
			)
			.subscribe();
	}

	showLogin() {
		this.openLogin$$ = this.simpleModalService
			.addModal(ConfirmComponent)
			.subscribe();
	}

	doLogout() {
		this.store.dispatch({ type: authActions.logout });
	}

	ngOnDestroy() {
		this.isLogged$$.unsubscribe();
		this.openLogin$$.unsubscribe();
	}
}
