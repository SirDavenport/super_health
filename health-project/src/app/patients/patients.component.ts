import { Component, OnInit, OnDestroy } from "@angular/core";
import { Patient } from "./patient.model";
import { Address } from "./address.model";
import { Router } from "@angular/router";
import { PatientsService } from "./patients.service";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.css"]
})
export class PatientsComponent implements OnInit, OnDestroy {
  patients: Patient[];
  patientsObservable: Observable<any>;
  sub: Subscription;
  constructor(
    private router: Router,
    private patientService: PatientsService
  ) {}

  ngOnInit() {
    this.patientService.getPatientsApi();
    this.sub = this.patientService.patientsChanged.subscribe(
      (patients: Patient[]) => {
        this.patients = patients;
      }
    );
  }

  onRowClick(id: string) {
    this.router.navigate(["/patient-detail", id]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
