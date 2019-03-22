import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PatientSearchPipe } from "../patients/patient-search.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EditEncounterComponent } from "../encounters/edit-encounter/edit-encounter.component";

@NgModule({
  declarations: [EditEncounterComponent, PatientSearchPipe],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [PatientSearchPipe, EditEncounterComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
