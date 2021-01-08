import * as _ from "lodash";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { ToastType } from "../shared/toast/toast.model";
import { ToastService } from "../shared/toast/toast.service";
import { authActions, login, loginSuccess } from "./auth.actions";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReturnType<typeof login>>(authActions.login),
      switchMap(x => this.authService.login$(x.payload).pipe(
        map((x) => ({ type: authActions.loginSuccess, payload: x })),
        catchError(() => of({ type: authActions.loginError }))
      ))
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => localStorage.removeItem("profile")),
      ),
    { dispatch: false }
  );

  loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginError),
        tap(() => localStorage.removeItem("profile")),
        tap(() => this.toastService.setMessage("Error during login", ToastType.error))
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ReturnType<typeof loginSuccess>>(authActions.loginSuccess),
        tap(x => localStorage.setItem("profile", JSON.stringify(x.payload))),
        tap(() => this.toastService.setMessage("Login Success", ToastType.success))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastService: ToastService
  ) { }
}
