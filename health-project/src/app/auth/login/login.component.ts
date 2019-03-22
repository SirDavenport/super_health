import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  error: any;
  constructor(private authService: AuthService, private router: Router) {}

  //Subscribes to loginError from authService
  ngOnInit() {}
  //calls login from authService
  onSubmit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      (response: string[]) => {
        if (response.length > 1) {
          this.router.navigate(["/patients"]);
        } else {
          this.error = "Email or Password are incorrect...";
        }
      },
      error => {
        this.error = "Something went wrong...";
      }
    );
  }
}
