import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AdminGuard } from "./auth/admin-guard.service";
import { PatientsModule } from "./patients/patients/patients.module";
import { EncountersModule } from "./encounters/encounters/encounters.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent
  ],
  imports: [BrowserModule, PatientsModule, EncountersModule, SharedModule],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
