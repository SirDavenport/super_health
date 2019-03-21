import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

//Service handling login functionality
@Injectable()
export class AuthService {
  token: string;
  roles: string[];
  loginError = new Subject<any>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  //Makes a get request to the backend. If the response has more than one array value,
  //the login was successful. Otherwise, there was an error.
  //If successful, redierect to patients and set the token, if not call next on the loginError subject.
  login(email: string, password: string) {
    this.httpClient
      .post("http://localhost:8080/users/login", {
        email: email,
        password: password
      })
      .subscribe(
        (response: string[]) => {
          if (response.length > 1) {
            this.token = response[0];
            this.roles = response;
            this.router.navigate(["/patients"]);
          } else {
            this.loginError.next("Email or Password are incorrect...");
          }
        },
        error => {
          this.loginError.next("Something went wrong...");
        }
      );
  }
  //Sets the token to null and navigates back to login.
  logout() {
    this.token = null;
    this.router.navigate(["/login"]);
  }
}
