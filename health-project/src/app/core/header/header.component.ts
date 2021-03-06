import { Component } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
//Handles the nav bar
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  //Calls logout service from authService.
  onLogout() {
    this.authService.logout();
  }
}
