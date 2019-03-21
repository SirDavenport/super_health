import { Patient } from "./patient.model";
import { Address } from "./address.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
const host = "http://localhost:8080/patients/";
@Injectable()
//Handles all the patient api calls.
export class PatientsService {
  patientsChanged = new Subject<Patient[]>();
  patientChanged = new Subject<Patient>();
  errorChanged = new Subject<any>();
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Get all patients from backend
   * Calls next on patientChanged subject
   */
  getPatientsApi() {
    this.httpClient
      .get(host, {
        headers: new HttpHeaders().set("jwt", this.authService.token)
      })
      .subscribe((response: Patient[]) => {
        this.patientsChanged.next(response);
      });
  }
  /**
   * Call api to add patient.
   * if the first element of the response is "Successfully added new patient",
   * then navigate to patients page. Otherwise call next on errorChanged subject
   * @param patient
   */
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
  /**
   * Call api to update patient.
   * if the first element of the response is "Successfully updated patient",
   * then navigate to patient-detail page. Otherwise call next on errorChanged subject
   * @param patient
   */
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
  /**
   * Call api to get patient by id.
   * If successful, call next on patientsChanged subject,
   * if error, call next on errorChanged subject.
   * @param id
   */
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
  /**
   * Call api to delete patient.
   * if the first element of the response is "Successfully deleted patient",
   * then navigate to patients. Otherwise call next on errorChanged subject
   * @param patient
   */
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
