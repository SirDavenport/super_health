import { Component, OnInit } from "@angular/core";
import { UserService } from "../users.service";
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl
} from "@angular/forms";
import { User } from "../user.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

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
  editingSelf = false;
  editMode = false;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["userId"];
      if (this.id != null) {
        this.editMode = true;
        this.userService.getUserById(this.id).subscribe((response: User) => {
          this.user = response;
          if (this.authService.email === this.user.email) {
            this.editingSelf = true;
          } else {
            this.editingSelf = false;
          }
          this.initForm();
          this.userForm.setValidators(this.validatePassword);
        });
      } else {
        this.editMode = false;
        this.user = new User(null, null, null, null, null, null);
        this.initForm();
        this.userForm.setValidators(this.validatePassword);
      }
    });
  }

  private initForm() {
    let rolesArray = new FormArray([]);
    if (this.id != null) {
      for (let role of this.user.roles) {
        rolesArray.push(
          new FormControl(
            role.toUpperCase(),
            Validators.pattern(/^(?:admin|Admin|user|User)$/i)
          )
        );
      }
    }
    this.userForm = new FormGroup({
      userId: new FormControl(this.user.userId),
      userName: new FormControl(this.user.userName, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s.,/":;]*$/)
      ]),
      title: new FormControl(this.user.title, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s.,/":;]*$/)
      ]),
      roles: rolesArray,
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern(/\S+@\S+\.\S+/)
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9!@#$%]{5,30}$/)
      ]),
      pCheck: new FormControl(this.user.password, [Validators.required])
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.userService
        .updateUser(this.userForm.value)
        .subscribe((response: string[]) => {
          if (response[0] === "Successfully updated user") {
            this.router.navigate(["../"], { relativeTo: this.route });
          } else {
            this.error = response.join(", ");
          }
        });
    } else {
      this.userService
        .addUser(this.userForm.value)
        .subscribe((response: string[]) => {
          if (response[0] === "Successfully added new user") {
            this.router.navigate(["users"]);
          } else {
            this.error = response.join(", ");
          }
        });
    }
  }
  getControls() {
    return (<FormArray>this.userForm.get("roles")).controls;
  }

  validatePassword(control: AbstractControl) {
    return control.value.pCheck === control.get("password").value
      ? null
      : { pMatch: true };
  }
  onAddRole() {
    (<FormArray>this.userForm.get("roles")).push(
      new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?:ADMIN|USER)$/)
      ])
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
