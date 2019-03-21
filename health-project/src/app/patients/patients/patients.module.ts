import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PatientsComponent } from "../patients.component";
import { PatientDetailComponent } from "../patient-detail/patient-detail.component";
import { EditPatientComponent } from "../edit-patient/edit-patient.component";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "src/app/app-routing.module";
import { PatientsService } from "../patients.service";
import { PatientGuard } from "../patient-guard.service";

@NgModule({
  declarations: [
    PatientsComponent,
    PatientDetailComponent,
    EditPatientComponent
  ],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  providers: [PatientsService, PatientGuard]
})
export class PatientsModule {}
