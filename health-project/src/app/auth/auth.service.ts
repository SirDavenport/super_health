import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable()
export class AuthService {
  token: string;
  roles: string[];
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    this.httpClient
      .post("http://localhost:8080/users/login", {
        email: email,
        password: password
      })
      .subscribe((response: string[]) => {
        this.token = response[0];
        this.router.navigate(["/patients"]);
      });
  }
  logout() {
    this.token = null;
    this.router.navigate(["/login"]);
  }
}
