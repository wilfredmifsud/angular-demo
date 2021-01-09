import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { AppState } from "src/app/app.model";
import { authActions } from "../auth.actions";
import { isLoggedIn } from "../auth.selector";

@Component({
	selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: "app-login"
	}
})
export class ConfirmComponent extends SimpleModalComponent<any, any> {
    loginForm!: FormGroup;

	private isLogged$ = this.store.select(isLoggedIn);
    private isLogged$$ = Subscription.EMPTY;

	constructor(
		private fb: FormBuilder,
		private store: Store<AppState>,
	) {
		super();
	}

	ngOnInit() {
		this.loginForm = this.fb.group({
			username: ["", Validators.required],
			password: ["", [Validators.required]]
		});

		this.isLogged$$ = this.isLogged$
			.pipe(
                filter(x => !!x?.username),
                tap(() => this.close())
			).subscribe();
	}

	doLogin() {
		if (!this.loginForm.valid) {
			return;
		}
		this.store.dispatch({
			type: authActions.login,
			payload: {
				username: this.loginForm.controls.username.value as string,
				password: this.loginForm.controls.password.value as string
			}
		});
    }

    ngOnDestroy() {
        this.isLogged$$.unsubscribe();
    }
}
