import { Component, OnInit } from "@angular/core";
import { PatientsService } from "../patients.service";
import { NgForm } from "@angular/forms";
import { Patient } from "../patient.model";
import { Address } from "../address.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.css"]
})
export class AddPatientComponent implements OnInit {
  errorSub: Subscription;
  error: any[];
  constructor(private patientService: PatientsService) {}

  ngOnInit() {
    this.errorSub = this.patientService.errorChanged.subscribe(response => {
      this.error = response;
    });
  }
  onSubmit(form: NgForm) {
    let value = form.value;
    const patient = new Patient(
      null,
      value.firstName,
      value.lastName,
      value.ssn,
      value.age,
      value.gender,
      value.height,
      value.weight,
      value.insurance,
      new Address(value.street, value.city, value.state, value.postal)
    );
    this.patientService.addPatient(patient);
  }
}
