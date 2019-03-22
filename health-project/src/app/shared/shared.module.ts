import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PatientSearchPipe } from "../patients/patient-search.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { AdminGuard } from "../auth/admin-guard.service";
import { RouterModule } from "@angular/router";
import { EditEncounterComponent } from "../encounters/edit-encounter/edit-encounter.component";

@NgModule({
  declarations: [EditEncounterComponent, PatientSearchPipe],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [AuthService, AdminGuard],
  exports: [PatientSearchPipe, EditEncounterComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AdminGuard]
    };
  }
}
