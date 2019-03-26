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
    return this.httpClient
      .get(host + "patient/" + patientId)
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
    return this.httpClient.get(host + id).subscribe(response => {
      this.store.dispatch(new EncounterActions.GetEncounter(response));
    });
  }
  /**
   * Calls backend to update an encounter.
   * @param encounter
   */
  updateEncounter(encounter: Encounter) {
    return this.httpClient.put(host + encounter.encounterId, encounter);
  }
  /**
   * Calls backend to add an encounter.
   * @param encounter
   */
  addEncounter(encounter: Encounter) {
    return this.httpClient.post(host, encounter);
  }
}
