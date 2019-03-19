import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PatientsService } from "../patients.service";
import { Patient } from "../patient.model";
import { Subscription } from "rxjs";
import { EncounterService } from "src/app/encounters/encounter.service";
import { Encounter } from "src/app/encounters/encounter.model";

@Component({
  selector: "app-patient-detail",
  templateUrl: "./patient-detail.component.html",
  styleUrls: ["./patient-detail.component.css"]
})
export class PatientDetailComponent implements OnInit, OnDestroy {
  patient: Patient;
  sub: Subscription;
  error: any[];
  errorSub: Subscription;
  id: string;
  encounterSub: Subscription;
  encounters: Encounter[];
  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService,
    private encounterService: EncounterService
  ) {}

  ngOnInit() {
    this.errorSub = this.patientsService.errorChanged.subscribe(response => {
      this.error = response;
    });
    this.sub = this.patientsService.patientChanged.subscribe(response => {
      this.patient = response;
    });
    this.encounterSub = this.encounterService.encountersChanged.subscribe(
      response => {
        this.encounters = response;
      }
    );
    this.route.params.subscribe(params => {
      this.id = params["patientId"];
      this.patientsService.getPatientApi(this.id);
    });
  }
  onDelete() {
    this.patientsService.deletePatientApi(this.id);
  }
  onViewEncounters() {
    this.encounterService.getEncountersByPatientApi(this.id);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.errorSub.unsubscribe();
    this.encounterSub.unsubscribe();
  }
}
