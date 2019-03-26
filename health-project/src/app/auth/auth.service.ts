import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as appStuff from "../store/app.state";
import * as AuthActions from "../store/auth.actions";
//Service handling login functionality
@Injectable({ providedIn: "root" })
export class AuthService {
  token: string;
  roles: string[];
  loginError = new Subject<any>();
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<appStuff.AppState>
  ) {}

  //Makes a get request to the backend. If the response has more than one array value,
  //the login was successful. Otherwise, there was an error.
  //If successful, redierect to patients and set the token, if not call next on the loginError subject.
  login(email: string, password: string) {
    return this.httpClient
      .post("https://java-super-health.herokuapp.com/users/login", {
        email: email,
        password: password
      })
      .subscribe(
        (response: string[]) => {
          if (response.length > 1) {
            this.store.dispatch(new AuthActions.SetToken(response));
          } else {
            this.store.dispatch(
              new AuthActions.SetAuthError("Incorrect email or password")
            );
          }
        },
        error => {
          this.store.dispatch(
            new AuthActions.SetAuthError("Something went wrong...")
          );
        }
      );
  }
}
