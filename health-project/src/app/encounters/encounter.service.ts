import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Encounter } from "./encounter.model";
import { Subject } from "rxjs";

@Injectable()
export class EncounterService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

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
}
