import { Patient } from "./patient.model";
import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appStuff from "../store/app.state";
import { Store } from "@ngrx/store";
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
    let token = null;
    this.store.select("authStuff").subscribe(response => {
      token = response.token;
    });
    return this.httpClient.get<Patient[]>(host, {
      headers: new HttpHeaders().set("jwt", token)
    });
  }
  /**
   * Call api to add patient.
   * @param patient
   */
  addPatient(patient: Patient) {
    let token = null;
    this.store.select("authStuff").subscribe(response => {
      token = response.token;
    });
    return this.httpClient.post(host, patient, {
      headers: new HttpHeaders().set("jwt", token)
    });
  }
  /**
   * Call api to update patient.
   * @param patient
   */
  updatePatient(patient: Patient, id: string) {
    let token = null;
    this.store.select("authStuff").subscribe(response => {
      token = response.token;
    });
    return this.httpClient.put(host + id, patient, {
      headers: new HttpHeaders().set("jwt", token)
    });
  }
  /**
   * Call api to get patient by id.
   * @param id
   */
  getPatientApi(id: string) {
    let token = null;
    this.store.select("authStuff").subscribe(response => {
      token = response.token;
    });
    return this.httpClient.get(host + id, {
      headers: new HttpHeaders().set("jwt", token)
    });
  }
  /**
   * Call api to delete patient.
   * @param patient
   */
  deletePatientApi(id: string) {
    let token = null;
    this.store.select("authStuff").subscribe(response => {
      token = response.token;
    });
    return this.httpClient.delete(host + id, {
      headers: new HttpHeaders().set("jwt", token)
    });
  }
}
