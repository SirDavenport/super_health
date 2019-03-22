import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
//Service handling login functionality
@Injectable({ providedIn: "root" })
export class AuthService {
  token: string;
  roles: string[];
  loginError = new Subject<any>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  //Makes a get request to the backend. If the response has more than one array value,
  //the login was successful. Otherwise, there was an error.
  //If successful, redierect to patients and set the token, if not call next on the loginError subject.
  login(email: string, password: string) {
    return this.httpClient
      .post("http://localhost:8080/users/login", {
        email: email,
        password: password
      })
      .pipe(
        tap((response: string[]) => {
          this.token = response[0];
          this.roles = response;
        })
      );
  }
  //Sets the token to null and navigates back to login.
  logout() {
    this.token = null;
    this.router.navigate(["/login"]);
  }
}
