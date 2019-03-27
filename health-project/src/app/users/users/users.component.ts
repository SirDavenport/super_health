import { Component, OnInit } from "@angular/core";
import { UserService } from "../users.service";
import { User } from "../user.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
