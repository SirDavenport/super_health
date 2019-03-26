import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import * as AuthActions from "../../store/auth.actions";
import * as appStuff from "../../store/app.state";
import { Store } from "@ngrx/store";
import * as PatientActions from "../../store/patients.actions";
import * as EncounterActions from "../../store/encounters.actions";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
//Handles the nav bar
export class HeaderComponent implements OnInit {
  token = false;
  constructor(private store: Store<appStuff.AppState>) {}

  ngOnInit() {
    this.store.select("authStuff").subscribe(response => {
      if (response.token != null) {
        this.token = true;
      } else {
        this.token = false;
      }
    });
  }
  //Calls logout service from authService.
  onLogout() {
    this.store.dispatch(new PatientActions.GetPatients(null));
    this.store.dispatch(new PatientActions.GetPatient(null));
    this.store.dispatch(new EncounterActions.GetEncounters(null));
    this.store.dispatch(new EncounterActions.GetEncounters(null));
    this.store.dispatch(new AuthActions.Logout());
  }
}
