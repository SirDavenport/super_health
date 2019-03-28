import { NgModule } from "@angular/core";
import { UsersComponent } from "./users/users.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { RouterModule } from "@angular/router";
import { UserEditComponent } from "./user-edit/user-edit.component";

const userRoutes = [
  { path: "", component: UsersComponent },
  { path: "user-detail/:userId", component: UserDetailComponent },
  { path: "user-detail/:userId/edit", component: UserEditComponent },
  { path: "signup", component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
