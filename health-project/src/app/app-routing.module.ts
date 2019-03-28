import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PatientGuard } from "./patients/patient-guard.service";
import { LoginComponent } from "./core/login/login.component";
import { Patient } from "./patients/patient.model";
import { AdminGuard } from "./auth/admin-guard.service";
//All of the routes for the app
const appRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "patients",
    loadChildren: "./patients/patients/patients.module#PatientsModule",
    canActivate: [PatientGuard]
  },
  {
    path: "users",
    loadChildren: "./users/users.module#UsersModule",
    canActivate: [PatientGuard, AdminGuard]
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
