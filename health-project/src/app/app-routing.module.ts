import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PatientsComponent } from "./patients/patients.component";
import { PatientDetailComponent } from "./patients/patient-detail/patient-detail.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { EditPatientComponent } from "./patients/edit-patient/edit-patient.component";
import { PatientGuard } from "./patients/patient-guard.service";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AddPatientComponent } from "./patients/add-patient/add-patient.component";
import { EncounterDetailComponent } from "./encounters/encounter-detail/encounter-detail.component";
import { EncounterGuard } from "./encounters/encounter-guard.service";
const appRoutes: Routes = [
  { path: "", redirectTo: "/patients", pathMatch: "full" },
  {
    path: "patient-detail/:patientId",
    component: PatientDetailComponent,
    pathMatch: "full",
    canActivate: [PatientGuard]
  },
  {
    path: "patient-detail/:patientId/edit",
    component: EditPatientComponent,
    pathMatch: "full",
    canActivate: [PatientGuard]
  },
  {
    path: "patients",
    component: PatientsComponent,
    pathMatch: "full",
    canActivate: [PatientGuard]
  },
  {
    path: "add-patient",
    component: AddPatientComponent,
    pathMatch: "full",
    canActivate: [PatientGuard]
  },

  { path: "login", component: LoginComponent },
  {
    path: "encounter-detail/:encounterId",
    component: EncounterDetailComponent,
    canActivate: [EncounterGuard]
  },
  { path: "**", component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
