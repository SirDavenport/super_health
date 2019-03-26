import { Routes, RouterModule } from "@angular/router";
import { EncounterDetailComponent } from "./encounter-detail/encounter-detail.component";
import { EditEncounterComponent } from "./edit-encounter/edit-encounter.component";
import { AdminGuard } from "../auth/admin-guard.service";
import { NgModule } from "@angular/core";
import { LoginGuard } from "../login-guard.service";

const encouterRoutes: Routes = [
  {
    path: "encounter-detail/:encounterId",
    component: EncounterDetailComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "encounter-detail/:encounterId/edit",
    component: EditEncounterComponent,
    canActivate: [LoginGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(encouterRoutes)],
  exports: [RouterModule]
})
export class EncounterRoutingModule {}
