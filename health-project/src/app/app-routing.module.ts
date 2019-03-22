import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PatientGuard } from "./patients/patient-guard.service";
//All of the routes for the app
const appRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "patients",
    loadChildren: "./patients/patients/patients.module#PatientsModule",
    canActivate: [PatientGuard]
  },
  { path: "**", component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
