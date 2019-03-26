import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Encounter } from "./encounter.model";
import { Store } from "@ngrx/store";
import * as EncounterActions from "../store/encounters.actions";
import * as appStuff from "../store/app.state";
const host = "https://java-super-health.herokuapp.com/encounters/";
@Injectable({ providedIn: "root" })
//Service for encounter api calls.
export class EncounterService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private store: Store<appStuff.AppState>
  ) {}
  /*
    Get Encounters by patient
    Calls the backend passing a patientId and jwt
  */
  getEncountersByPatientApi(patientId: string) {
    let token = null;
    this.store.select("authStuff").subscribe(response => {
      token = response.token;
    });
    return this.httpClient
      .get(host + "patient/" + patientId, {
        headers: new HttpHeaders().set("jwt", token)
      })
      .subscribe(response => {
        this.store.dispatch(new EncounterActions.GetEncounters(response));
      });
  }
  /**
   * Calls backend to get an encounter by id.
   * Calls next on the encounterChanged subject passing through the response
   * @param id
   */
  getEncounterById(id: string) {
    let token = null;
    this.store.select("authStuff").subscribe(response => {
      token = response.token;
    });
    return this.httpClient
      .get(host + id, {
        headers: new HttpHeaders().set("jwt", token)
      })
      .subscribe(response => {
        this.store.dispatch(new EncounterActions.GetEncounter(response));
      });
  }
  /**
   * Calls backend to update an encounter.
   * @param encounter
   */
  updateEncounter(encounter: Encounter) {
    let token = null;
    this.store.select("authStuff").subscribe(response => {
      token = response.token;
    });
    return this.httpClient.put(host + encounter.encounterId, encounter, {
      headers: new HttpHeaders().set("jwt", token)
    });
  }
  /**
   * Calls backend to add an encounter.
   * @param encounter
   */
  addEncounter(encounter: Encounter) {
    let token = null;
    this.store.select("authStuff").subscribe(response => {
      token = response.token;
    });
    return this.httpClient.post(host, encounter, {
      headers: new HttpHeaders().set("jwt", token)
    });
  }
}
