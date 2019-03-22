import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PatientsComponent } from "./patients/patients.component";
import { PatientDetailComponent } from "./patients/patient-detail/patient-detail.component";
import { LoginComponent } from "./auth/login/login.component";
import { EditPatientComponent } from "./patients/edit-patient/edit-patient.component";
import { PatientGuard } from "./patients/patient-guard.service";
import { NotFoundComponent } from "./not-found/not-found.component";
import { EncounterDetailComponent } from "./encounters/encounter-detail/encounter-detail.component";
import { EncounterGuard } from "./encounters/encounter-guard.service";
import { EditEncounterComponent } from "./encounters/edit-encounter/edit-encounter.component";
import { AdminGuard } from "./auth/admin-guard.service";
//All of the routes for the app
const appRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "**", component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
