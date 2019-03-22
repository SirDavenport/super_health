import { Patient } from "./patient.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
const host = "http://localhost:8080/patients/";
@Injectable({ providedIn: "root" })
//Handles all the patient api calls.
export class PatientsService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Get all patients from backend
   */
  getPatientsApi() {
    return this.httpClient.get<Patient[]>(host, {
      headers: new HttpHeaders().set("jwt", this.authService.token)
    });
  }
  /**
   * Call api to add patient.
   * @param patient
   */
  addPatient(patient: Patient) {
    return this.httpClient.post(host, patient, {
      headers: new HttpHeaders().set("jwt", this.authService.token)
    });
  }
  /**
   * Call api to update patient.
   * @param patient
   */
  updatePatient(patient: Patient, id: string) {
    return this.httpClient.put(host + id, patient, {
      headers: new HttpHeaders().set("jwt", this.authService.token)
    });
  }
  /**
   * Call api to get patient by id.
   * @param id
   */
  getPatientApi(id: string) {
    return this.httpClient.get(host + id, {
      headers: new HttpHeaders().set("jwt", this.authService.token)
    });
  }
  /**
   * Call api to delete patient.
   * @param patient
   */
  deletePatientApi(id: string) {
    return this.httpClient.delete(host + id, {
      headers: new HttpHeaders().set("jwt", this.authService.token)
    });
  }
}
