import { Routes, RouterModule } from "@angular/router";
import { EncounterDetailComponent } from "./encounter-detail/encounter-detail.component";
import { EncounterGuard } from "./encounter-guard.service";
import { EditEncounterComponent } from "./edit-encounter/edit-encounter.component";
import { AdminGuard } from "../auth/admin-guard.service";
import { NgModule } from "@angular/core";

const encouterRoutes: Routes = [
  {
    path: "encounter-detail/:encounterId",
    component: EncounterDetailComponent,
    canActivate: [EncounterGuard, AdminGuard]
  },
  {
    path: "encounter-detail/:encounterId/edit",
    component: EditEncounterComponent,
    canActivate: [EncounterGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(encouterRoutes)],
  exports: [RouterModule]
})
export class EncounterRoutingModule {}
