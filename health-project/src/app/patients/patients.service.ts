import { Patient } from "./patient.model";
import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appStuff from "../store/app.state";
import { Store } from "@ngrx/store";
import * as PatientActions from "../store/patients.actions";
const host = "https://java-super-health.herokuapp.com/patients/";
@Injectable({ providedIn: "root" })
//Handles all the patient api calls.
export class PatientsService implements OnInit {
  token: string;
  constructor(
    private httpClient: HttpClient,
    private store: Store<appStuff.AppState>
  ) {}
  ngOnInit() {}
  /**
   * Get all patients from backend
   */
  getPatientsApi() {
    this.httpClient.get<Patient[]>(host).subscribe(response => {
      this.store.dispatch(new PatientActions.GetPatients(response));
    });
  }
  /**
   * Call api to add patient.
   * @param patient
   */
  addPatient(patient: Patient) {
    return this.httpClient.post(host, patient);
  }
  /**
   * Call api to update patient.
   * @param patient
   */
  updatePatient(patient: Patient, id: string) {
    return this.httpClient.put(host + id, patient);
  }
  /**
   * Call api to get patient by id.
   * @param id
   */
  getPatientApi(id: string) {
    this.httpClient.get(host + id).subscribe((response: Patient) => {
      this.store.dispatch(new PatientActions.GetPatient(response));
    });
  }
  /**
   * Call api to delete patient.
   * @param patient
   */
  deletePatientApi(id: string) {
    return this.httpClient.delete(host + id);
  }
}
