import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as _ from "lodash";

import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";

import { ToastType } from "../shared/toast/toast.model";
import { ToastService } from "../shared/toast/toast.service";

import { authActions } from "./auth.actions";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(
        (
          x: any // todo: fix types for effects
        ) => {
          return this.authService.login$(x.payload).pipe(
            map((x) => ({ type: authActions.loginSuccess, payload: x })),
            catchError(() => of({ type: authActions.loginError }))
          );
        }
      )
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
        tap(() =>
          this.toastService.setMessage("Error during login", ToastType.error)
        )
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap((x: any) => localStorage.setItem("profile", JSON.stringify(x.payload))),
        tap(() =>
          this.toastService.setMessage("Login Success", ToastType.success)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
}
