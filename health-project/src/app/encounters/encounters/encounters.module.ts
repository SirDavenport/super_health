import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EncounterDetailComponent } from "../encounter-detail/encounter-detail.component";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "src/app/app-routing.module";
import { EncounterRoutingModule } from "../encounters-routing.module";
import { AuthInterceptor } from "src/app/shared/auth.interceptor";

@NgModule({
  declarations: [EncounterDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    EncounterRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class EncountersModule {}
