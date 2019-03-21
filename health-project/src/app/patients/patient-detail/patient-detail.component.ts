import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PatientsService } from "../patients.service";
import { Patient } from "../patient.model";
import { Subscription } from "rxjs";
import { Encounter } from "src/app/encounters/encounter.model";

@Component({
  selector: "app-patient-detail",
  templateUrl: "./patient-detail.component.html",
  styleUrls: ["./patient-detail.component.css"]
})
//Handles all things patient detail
export class PatientDetailComponent implements OnInit, OnDestroy {
  patient: Patient;
  sub: Subscription;
  error: any[];
  errorSub: Subscription;
  id: string;
  encounterButtonClicked = false;
  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService
  ) {}

  /**
   * Subscribes to errorChanged in patientService.
   * Subscribes to patientChanged in patientService.
   * Subscribes to route params. Sets id to patientId param.
   * Calls getPatientApi from patientService.
   */
  ngOnInit() {
    this.errorSub = this.patientsService.errorChanged.subscribe(response => {
      this.error = response;
    });
    this.sub = this.patientsService.patientChanged.subscribe(response => {
      this.patient = response;
    });
    this.route.params.subscribe(params => {
      this.id = params["patientId"];
      this.patientsService.getPatientApi(this.id);
    });
  }
  /**
   * Calls deletePatientApi from patientsService
   */
  onDelete() {
    this.patientsService.deletePatientApi(this.id);
  }
  /**
   * Sets encounterButtonClicked to the opposite of what it was.
   * This field is what determines whether or not the encounters will be shown on page.
   */
  onViewEncounters() {
    this.encounterButtonClicked = !this.encounterButtonClicked;
  }
  //Unsubscribe
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
