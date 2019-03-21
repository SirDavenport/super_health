import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
//Handles the nav bar
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  //Calls logout service from authService.
  onLogout() {
    this.authService.logout();
  }
}
