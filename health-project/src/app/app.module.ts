import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { PatientsComponent } from "./patients/patients.component";
import { EncountersComponent } from "./encounters/encounters.component";
import { PatientsService } from "./patients/patients.service";
import { HttpClientModule } from "@angular/common/http";
import { PatientDetailComponent } from "./patients/patient-detail/patient-detail.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { EditPatientComponent } from "./patients/edit-patient/edit-patient.component";
import { PatientGuard } from "./patients/patient-guard.service";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthService } from "./auth/auth.service";
import { EncounterService } from "./encounters/encounter.service";
import { EncounterDetailComponent } from "./encounters/encounter-detail/encounter-detail.component";
import { EncounterGuard } from "./encounters/encounter-guard.service";
import { EditEncounterComponent } from "./encounters/edit-encounter/edit-encounter.component";
import { AdminGuard } from "./auth/admin-guard.service";
import { PatientSearchPipe } from "./patients/patient-search.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PatientsComponent,
    EncountersComponent,
    PatientDetailComponent,
    LoginComponent,
    SignupComponent,
    EditPatientComponent,
    NotFoundComponent,
    EncounterDetailComponent,
    EditEncounterComponent,
    PatientSearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    PatientsService,
    PatientGuard,
    AuthService,
    EncounterService,
    EncounterGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
