import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { PatientsService } from "../patients.service";
import { Patient } from "../patient.model";
import { Subscription } from "rxjs";
import { validateConfig } from "@angular/router/src/config";
import { Address } from "../address.model";

@Component({
  selector: "app-edit-patient",
  templateUrl: "./edit-patient.component.html",
  styleUrls: ["./edit-patient.component.css"]
})
export class EditPatientComponent implements OnInit {
  patientForm: FormGroup;
  sub: Subscription;
  id: string;
  patient: Patient = new Patient(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    new Address(null, null, null, null)
  );
  error: any[];
  errorSub: Subscription;
  editMode = false;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["patientId"];
      if (this.id != undefined) {
        this.editMode = true;
        this.patientService.getPatientApi(this.id);
      } else {
        this.initForm();
      }
    });
    this.sub = this.patientService.patientChanged.subscribe(response => {
      this.patient = response;
      if (this.patient != null && this.editMode) {
        this.initForm();
      }
    });
    this.errorSub = this.patientService.errorChanged.subscribe(response => {
      this.error = response;
    });
  }

  private initForm() {
    this.patientForm = new FormGroup({
      firstName: new FormControl(this.patient.firstName, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]{2,30}$/)
      ]),
      lastName: new FormControl(this.patient.lastName, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]{2,30}$/)
      ]),
      ssn: new FormControl(this.patient.ssn, [
        Validators.required,
        Validators.pattern(/^\d{3}-?\d{2}-?\d{4}$/)
      ]),
      gender: new FormControl(this.patient.gender, [
        Validators.required,
        Validators.pattern(/^(?:male|Male|female|Female)$/)
      ]),
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
        street: new FormControl(this.patient.address.street, [
          Validators.required,
          Validators.pattern(/^\w+(\s\w+){1,}$/)
        ]),
        city: new FormControl(this.patient.address.city, [
          Validators.required,
          Validators.pattern(/^[A-Za-z\s]{4,30}$/)
        ]),
        state: new FormControl(this.patient.address.state, [
          Validators.required,
          Validators.pattern(
            /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
          )
        ]),
        postal: new FormControl(this.patient.address.postal, [
          Validators.required,
          Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
        ])
      })
    });
  }
  onSubmit() {
    let patient: Patient;
    if (this.editMode) {
      if (this.patientForm.valid) {
        patient = this.patientForm.value;
        this.patientService.updatePatient(patient, this.id);
      }
    } else {
      if (this.patientForm.valid) {
        patient = this.patientForm.value;
        this.patientService.addPatient(patient);
      }
    }
  }
}
