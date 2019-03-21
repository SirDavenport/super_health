import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PatientSearchPipe } from "../patients/patient-search.pipe";
import { EncountersComponent } from "../encounters/encounters.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [PatientSearchPipe, EncountersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PatientSearchPipe,
    EncountersComponent,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
