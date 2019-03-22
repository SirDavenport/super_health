import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PatientsComponent } from "./patients.component";
import { PatientGuard } from "./patient-guard.service";
import { PatientDetailComponent } from "./patient-detail/patient-detail.component";
import { AdminGuard } from "../auth/admin-guard.service";
import { EditPatientComponent } from "./edit-patient/edit-patient.component";
import { EditEncounterComponent } from "../encounters/edit-encounter/edit-encounter.component";
import { EncounterGuard } from "../encounters/encounter-guard.service";
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
    canActivate: [PatientGuard, AdminGuard]
  },
  {
    path: "patient-detail/:patientId/add-encounter",
    component: EditEncounterComponent,
    canActivate: [EncounterGuard, AdminGuard]
  },
  {
    path: "patient-detail/:patientId/edit",
    component: EditPatientComponent,
    pathMatch: "full",
    canActivate: [PatientGuard, AdminGuard]
  },
  {
    path: "add-patient",
    component: EditPatientComponent,
    pathMatch: "full",
    canActivate: [PatientGuard, AdminGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(patientRoutes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
