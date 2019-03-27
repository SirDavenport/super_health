import { Component, OnInit } from "@angular/core";
import { User } from "../user.model";
import { UserService } from "../users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.userService.getUsers().subscribe((response: User[]) => {
      this.users = response;
    });
  }

  onRowClick(id: string) {
    this.router.navigate(["users/user-detail", id]);
  }
}
