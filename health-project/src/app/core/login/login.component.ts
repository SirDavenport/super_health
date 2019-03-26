import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import * as appStuff from "../../store/app.state";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  error: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<appStuff.AppState>
  ) {}

  //Subscribes to loginError from authService
  ngOnInit() {}
  //calls login from authService
  onSubmit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password);
    this.store.select("authStuff").subscribe(response => {
      if (response.token != null) {
        this.router.navigate(["patients"]);
      }
      this.error = response.authError;
    });
  }
}
