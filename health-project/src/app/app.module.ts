import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PatientsModule } from "./patients/patients/patients.module";
import { EncountersModule } from "./encounters/encounters/encounters.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    PatientsModule,
    EncountersModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
