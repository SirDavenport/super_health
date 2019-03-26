import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PatientsComponent } from "../patients.component";
import { PatientDetailComponent } from "../patient-detail/patient-detail.component";
import { EditPatientComponent } from "../edit-patient/edit-patient.component";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { PatientsRoutingModule } from "../patients-routing.module";
import { EncountersComponent } from "src/app/encounters/encounters.component";
import { AuthInterceptor } from "src/app/shared/auth.interceptor";

@NgModule({
  declarations: [
    PatientsComponent,
    PatientDetailComponent,
    EditPatientComponent,
    EncountersComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class PatientsModule {}
