import { Component, OnInit } from "@angular/core";
import { UserService } from "../users.service";
import { User } from "../user.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  user: User;
  id: string;
  editingSelf = false;
  viewPassword = false;
  error: string[];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["userId"];
      this.userService.getUserById(this.id).subscribe((response: User) => {
        this.user = response;
        if (this.authService.email === this.user.email) {
          this.editingSelf = true;
        } else {
          this.editingSelf = false;
        }
      });
    });
  }
  onDelete() {
    this.userService.deleteUser(this.id).subscribe((response: string[]) => {
      if (response[0] === "Successfully deleted user") {
        this.router.navigate(["/users"]);
      } else {
        this.error = response;
      }
    });
  }
}
