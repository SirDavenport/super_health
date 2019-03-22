import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PatientsService } from "../patients.service";
import { Patient } from "../patient.model";

@Component({
  selector: "app-patient-detail",
  templateUrl: "./patient-detail.component.html",
  styleUrls: ["./patient-detail.component.css"]
})
//Handles all things patient detail
export class PatientDetailComponent implements OnInit {
  patient: Patient;
  error: any[];
  id: string;
  encounterButtonClicked = false;
  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService,
    private router: Router
  ) {}

  /**
   * Subscribes to errorChanged in patientService.
   * Subscribes to patientChanged in patientService.
   * Subscribes to route params. Sets id to patientId param.
   * Calls getPatientApi from patientService.
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["patientId"];
      this.patientsService.getPatientApi(this.id).subscribe(
        (response: Patient) => {
          this.patient = response;
        },
        (error: any) => {
          this.error = error;
        }
      );
    });
  }
  /**
   * Calls deletePatientApi from patientsService
   */
  onDelete() {
    this.patientsService
      .deletePatientApi(this.id)
      .subscribe((response: string[]) => {
        if (response[0] === "Successfully deleted patient") {
          this.router.navigate(["/patients"]);
        } else {
          this.error = response;
        }
      });
  }
  /**
   * Sets encounterButtonClicked to the opposite of what it was.
   * This field is what determines whether or not the encounters will be shown on page.
   */
  onViewEncounters() {
    this.encounterButtonClicked = !this.encounterButtonClicked;
  }
}
