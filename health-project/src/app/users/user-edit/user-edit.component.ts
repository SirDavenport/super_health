import { Component, OnInit } from "@angular/core";
import { UserService } from "../users.service";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { User } from "../user.model";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  error: string;
  id: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["userId"];
      this.userService.getUserById(this.id).subscribe((response: User) => {
        this.user = response;
        this.initForm();
      });
    });
  }

  private initForm() {
    let rolesArray = new FormArray([]);
    for (let role of this.user.roles) {
      rolesArray.push(
        new FormControl(
          role,
          Validators.pattern(/^(?:admin|Admin|user|User)$/i)
        )
      );
    }
    this.userForm = new FormGroup({
      userId: new FormControl(this.user.userId),
      userName: new FormControl(this.user.userName),
      title: new FormControl(this.user.title),
      roles: rolesArray,
      email: new FormControl(this.user.email),
      password: new FormControl(this.user.password)
    });
  }

  onSubmit() {
    this.userService
      .updateUser(this.userForm.value)
      .subscribe((response: string[]) => {
        if (response[0] === "Successfully updated user") {
          this.router.navigate(["../"], { relativeTo: this.route });
        } else {
          this.error = response.join(", ");
        }
      });
  }
  getControls() {
    return (<FormArray>this.userForm.get("roles")).controls;
  }

  onAddRole() {
    (<FormArray>this.userForm.get("roles")).push(
      new FormControl(null, Validators.pattern(/^(?:admin|Admin|user|User)$/i))
    );
  }

  onDeleteRole(index: number) {
    if ((<FormArray>this.userForm.get("roles")).length === 1) {
      this.error = "User must have at least one role.";
    } else {
      (<FormArray>this.userForm.get("roles")).removeAt(index);
    }
  }
}
