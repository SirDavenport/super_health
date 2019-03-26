import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginGuard } from "./login-guard.service";
import { LoginComponent } from "./core/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
//All of the routes for the app
const appRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "patients",
    loadChildren: "./patients/patients/patients.module#PatientsModule",
    canActivate: [LoginGuard]
  },
  { path: "**", component: NotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
