import { Component, OnInit, OnDestroy } from "@angular/core";
import { Patient } from "./patient.model";
import { Router } from "@angular/router";
import { PatientsService } from "./patients.service";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.css"]
})
/**
 * Handles the main patients component.
 */
export class PatientsComponent implements OnInit {
  patients: Patient[];
  patientsObservable: Observable<any>;
  sub: Subscription;
  filter = "";
  searchSelect = "firstName";
  propNames = [
    { key: "patientId", visual: "Patient Id" },
    { key: "firstName", visual: "First Name" },
    { key: "lastName", visual: "Last Name" },
    { key: "age", visual: "Age" },
    { key: "height", visual: "Height" },
    { key: "weight", visual: "Weight" }
  ];

  constructor(
    private router: Router,
    private patientService: PatientsService
  ) {}

  /**
   * Calls getPatientsApi from patientService.
   * Subscribes to patientsChanged from patientService and
   * sets this.patients to what is returned from patientsChanged.
   */
  ngOnInit() {
    this.patientService.getPatientsApi().subscribe((response: Patient[]) => {
      this.patients = response;
    });
  }

  /**
   * Navigates to patient-detail page.
   * @param id
   */
  onRowClick(id: string) {
    this.router.navigate(["patients/patient-detail", id]);
  }
}
