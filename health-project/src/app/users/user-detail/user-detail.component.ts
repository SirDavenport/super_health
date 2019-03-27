import { Component, OnInit } from "@angular/core";
import { UserService } from "../users.service";
import { User } from "../user.model";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {
  user: User;
  id: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["userId"];
      this.userService.getUserById(this.id).subscribe((response: User) => {
        this.user = response;
      });
    });
  }
  onDelete() {
    this.userService.deleteUser(this.id);
  }
}
