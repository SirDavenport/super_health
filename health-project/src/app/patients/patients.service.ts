import { Patient } from "./patient.model";
import { Address } from "./address.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
const host = "http://localhost:8080/patients/";
@Injectable()
export class PatientsService {
  patientsChanged = new Subject<Patient[]>();
  patientChanged = new Subject<Patient>();
  errorChanged = new Subject<any>();
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  getPatientsApi() {
    this.httpClient
      .get(host, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe((response: Patient[]) => {
        this.patientsChanged.next(response);
      });
  }
  addPatient(patient: Patient) {
    this.httpClient
      .post(host, patient, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe((response: string) => {
        if (response[0] === "Successfully added new patient") {
          this.router.navigate(["/patients"]);
        } else {
          this.errorChanged.next(response);
        }
      });
  }

  updatePatient(patient: Patient, id: string) {
    this.httpClient
      .put(host + id, patient, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe(response => {
        if (response[0] === "Successfully updated patient") {
          this.router.navigate(["patient-detail", id]);
        } else {
          this.errorChanged.next(response);
        }
      });
  }

  getPatientApi(id: string) {
    this.httpClient
      .get(host + id, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe(
        (response: Patient) => {
          this.patientChanged.next(response);
        },
        error => {
          this.errorChanged.next(error);
        }
      );
  }
  deletePatientApi(id: string) {
    this.httpClient
      .delete(host + id, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe(response => {
        if (response[0] === "Successfully deleted patient") {
          this.router.navigate(["/patients"]);
        } else {
          this.errorChanged.next(response);
        }
      });
  }
}
