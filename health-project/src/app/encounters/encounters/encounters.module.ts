import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EncounterDetailComponent } from "../encounter-detail/encounter-detail.component";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "src/app/app-routing.module";
import { EncounterRoutingModule } from "../encounters-routing.module";

@NgModule({
  declarations: [EncounterDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    EncounterRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EncountersModule {}
