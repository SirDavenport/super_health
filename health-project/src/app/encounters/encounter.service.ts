import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Encounter } from "./encounter.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
const host = "http://localhost:8080/encounters/";
@Injectable()
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
  getEncountersByPatientApi(patientId: string) {
    this.httpClient
      .get(host + "patient/" + patientId, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe((response: Encounter[]) => {
        this.encountersChanged.next(response);
      });
  }
  getEncounterById(id: string) {
    this.httpClient
      .get(host + id, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe((response: Encounter) => {
        this.encounterChanged.next(response);
      });
  }
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
