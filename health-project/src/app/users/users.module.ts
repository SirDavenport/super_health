import { NgModule } from "@angular/core";
import { UserListComponent } from "./user-list/user-list.component";
import { UsersComponent } from "./users/users.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { CommonModule } from "@angular/common";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UserListComponent,
    UserEditComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule]
})
export class UsersModule {}
