import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PatientSearchPipe } from "../patients/patient-search.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EditEncounterComponent } from "../encounters/edit-encounter/edit-encounter.component";
import { ShortenPipe } from "./shorten.pipe";

@NgModule({
  declarations: [EditEncounterComponent, PatientSearchPipe, ShortenPipe],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [PatientSearchPipe, EditEncounterComponent, ShortenPipe]
})
export class SharedModule {}
