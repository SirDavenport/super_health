import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { PatientsService } from "../patients.service";
import { Patient } from "../patient.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-patient",
  templateUrl: "./edit-patient.component.html",
  styleUrls: ["./edit-patient.component.css"]
})
export class EditPatientComponent implements OnInit {
  patientForm: FormGroup;
  sub: Subscription;
  id: string;
  patient: Patient;
  error: any[];
  errorSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["patientId"];
      this.patientService.getPatientApi(this.id);
    });
    this.sub = this.patientService.patientChanged.subscribe(response => {
      this.patient = response;
      if (this.patient != null) {
        this.initForm();
      }
    });
    this.errorSub = this.patientService.errorChanged.subscribe(response => {
      this.error = response;
    });
  }

  private initForm() {
    this.patientForm = new FormGroup({
      firstName: new FormControl(this.patient.firstName, Validators.required),
      lastName: new FormControl(this.patient.lastName, Validators.required),
      ssn: new FormControl(this.patient.ssn, Validators.required),
      gender: new FormControl(this.patient.gender, Validators.required),
      age: new FormControl(this.patient.age, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      height: new FormControl(this.patient.height, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      weight: new FormControl(this.patient.weight, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      insurance: new FormControl(this.patient.insurance, Validators.required),
      address: new FormGroup({
        street: new FormControl(
          this.patient.address.street,
          Validators.required
        ),
        city: new FormControl(this.patient.address.city, Validators.required),
        state: new FormControl(this.patient.address.state, Validators.required),
        postal: new FormControl(
          this.patient.address.postal,
          Validators.required
        )
      })
    });
  }
  onUpdate() {
    let patient: Patient;
    if (this.patientForm.valid) {
      patient = this.patientForm.value;
      this.patientService.updatePatient(patient, this.id);
    }
  }
}
