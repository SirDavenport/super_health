import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PatientGuard } from "./patients/patient-guard.service";
import { LoginComponent } from "./core/login/login.component";
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
