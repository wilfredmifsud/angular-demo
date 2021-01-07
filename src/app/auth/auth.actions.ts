import { Action, createAction, props } from "@ngrx/store";

import { Coin } from "../listing/listing.model";

import { AuthLoginRequest, AuthUserProfile } from "./auth.model";

export interface LoginAction extends Action {
  payload: any;
}
export const authActions = {
  login: "[Auth] Login",
  loginSuccess: "[Auth] Login Sucess",
  loginError: "[Auth] Login Error",
  logout: "[Auth] Logout",
  toggleFavoriteCoin: "[Auth] Toggle Favorite Coin",
};

export const login = createAction(
  authActions.login,
  props<{ payload: AuthLoginRequest }>()
);
export const loginSuccess = createAction(
  authActions.loginSuccess,
  props<{ payload: AuthUserProfile }>()
);
export const loginError = createAction(authActions.loginError);
export const logout = createAction(authActions.logout);
export const toggleFavoriteCoin = createAction(
  authActions.toggleFavoriteCoin,
  props<{ payload: Coin }>()
);
