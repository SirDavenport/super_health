import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable()
export class AuthService {
  token: string;
  roles: string[];
  loginError = new Subject<any>();
  constructor(private httpClient: HttpClient, private router: Router) {}

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
  logout() {
    this.token = null;
    this.router.navigate(["/login"]);
  }
}
