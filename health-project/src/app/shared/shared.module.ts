import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PatientSearchPipe } from "../patients/patient-search.pipe";
import { EncountersComponent } from "../encounters/encounters.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { AdminGuard } from "../auth/admin-guard.service";

@NgModule({
  declarations: [PatientSearchPipe, EncountersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AdminGuard],
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
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AdminGuard]
    };
  }
}
