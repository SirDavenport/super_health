import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { EncountersModule } from "./encounters/encounters/encounters.module";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "./core/core.module";
import { StoreModule } from "@ngrx/store";
import { encounterReducer } from "./store/encounters.reducers";

@NgModule({
  declarations: [AppComponent, SignupComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    EncountersModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    StoreModule.forRoot({ encounterStuff: encounterReducer })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
