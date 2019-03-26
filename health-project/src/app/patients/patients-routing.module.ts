import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PatientsComponent } from "./patients.component";
import { LoginGuard } from "../login-guard.service";
import { PatientDetailComponent } from "./patient-detail/patient-detail.component";
import { AdminGuard } from "../auth/admin-guard.service";
import { EditPatientComponent } from "./edit-patient/edit-patient.component";
import { EditEncounterComponent } from "../encounters/edit-encounter/edit-encounter.component";
const patientRoutes: Routes = [
  {
    path: "",
    component: PatientsComponent,
    pathMatch: "full"
  },
  {
    path: "patient-detail/:patientId",
    component: PatientDetailComponent,
    pathMatch: "full",
    canActivate: [LoginGuard, AdminGuard]
  },
  {
    path: "patient-detail/:patientId/add-encounter",
    component: EditEncounterComponent,
    canActivate: [LoginGuard, AdminGuard]
  },

  {
    path: "patient-detail/:patientId/edit",
    component: EditPatientComponent,
    pathMatch: "full",
    canActivate: [LoginGuard, AdminGuard]
  },
  {
    path: "add-patient",
    component: EditPatientComponent,
    pathMatch: "full",
    canActivate: [LoginGuard, AdminGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(patientRoutes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
