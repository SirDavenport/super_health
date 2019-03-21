import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  error: any;
  errorSub: Subscription;
  constructor(private authService: AuthService) {}

  //Subscribes to loginError from authService
  ngOnInit() {
    this.errorSub = this.authService.loginError.subscribe(response => {
      this.error = response;
    });
  }
  //calls login from authService
  onSubmit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password);
  }

  //Unsubscribes
  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
