import { Action } from "@ngrx/store";

export const SET_TOKEN = "SET_TOKEN";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const LOG_OUT = "LOG_OUT";
export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload) {}
}
export class SetAuthError implements Action {
  readonly type = SET_AUTH_ERROR;
  constructor(public payload) {}
}
export class Logout implements Action {
  readonly type = LOG_OUT;
}
export type AuthActions = SetToken | SetAuthError | Logout;
