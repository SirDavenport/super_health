import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Encounter } from "./encounter.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

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
      .get("http://localhost:8080/encounters/patient/" + patientId, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe((response: Encounter[]) => {
        console.log(response);
        this.encountersChanged.next(response);
      });
  }
  getEncounterById(id: string) {
    this.httpClient
      .get("http://localhost:8080/encounters/" + id, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe((response: Encounter) => {
        this.encounterChanged.next(response);
      });
  }
  updateEncounter(encounter: Encounter) {
    this.httpClient
      .put(
        "http://localhost:8080/encounters/" + encounter.encounterId,
        encounter,
        {
          headers: new HttpHeaders().set("jwt", this.authService.token)
        }
      )
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
      .post("http://localhost:8080/encounters", encounter, {
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
