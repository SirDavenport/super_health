import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EncounterDetailComponent } from "../encounter-detail/encounter-detail.component";
import { EditEncounterComponent } from "../edit-encounter/edit-encounter.component";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EncounterService } from "../encounter.service";
import { EncounterGuard } from "../encounter-guard.service";

@NgModule({
  declarations: [EncounterDetailComponent, EditEncounterComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  providers: [EncounterService, EncounterGuard]
})
export class EncountersModule {}
