import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Encounter } from "./encounter.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
const host = "http://localhost:8080/encounters/";
@Injectable()
//Service for encounter api calls.
export class EncounterService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {}
  errorChanged = new Subject<any>();
  encounters: Encounter[];
  encounterChanged = new Subject<Encounter>();
  encountersChanged = new Subject<Encounter[]>();
  /*
    Get Encounters by patient
    Calls the backend passing a patientId and jwt
    calls next on the encountersChanged subject, passing the response through.
  */
  getEncountersByPatientApi(patientId: string) {
    this.httpClient
      .get(host + "patient/" + patientId, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe((response: Encounter[]) => {
        this.encountersChanged.next(response);
      });
  }
  /**
   * Calls backend to get an encounter by id.
   * Calls next on the encounterChanged subject passing through the response
   * @param id
   */
  getEncounterById(id: string) {
    this.httpClient
      .get(host + id, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe((response: Encounter) => {
        this.encounterChanged.next(response);
      });
  }
  /**
   * Calls backend to update an encounter.
   * If the 0th element of the response is "Successfully updated encounter",
   * navigate back to the encounter that was updated.
   * Else, call next on the errorChanged subscription.
   * @param encounter
   */
  updateEncounter(encounter: Encounter) {
    this.httpClient
      .put(host + encounter.encounterId, encounter, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe(response => {
        if (response[0] === "Successfully updated encounter") {
          this.router.navigate(["encounter-detail", encounter.encounterId]);
        } else {
          this.errorChanged.next(response);
        }
      });
  }
  /**
   * Calls backend to add an encounter.
   * If the 0th element of the response is "Successfully added new encounter",
   * navigate back to the patient that added the encounter.
   * Else, call next on the errorChanged subscription.
   * @param encounter
   */
  addEncounter(encounter: Encounter) {
    this.httpClient
      .post(host, encounter, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe(response => {
        if (response[0] === "Successfully added new encounter") {
          this.router.navigate(["patient-detail", encounter.patientId]);
        } else {
          this.errorChanged.next(response);
        }
      });
  }
}
