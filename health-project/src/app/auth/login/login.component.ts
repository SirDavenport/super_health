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

  ngOnInit() {
    this.errorSub = this.authService.loginError.subscribe(response => {
      this.error = response;
    });
  }
  onSubmit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
