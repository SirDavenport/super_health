import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EncounterService } from "../encounter.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Encounter } from "../encounter.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-encounter",
  templateUrl: "./edit-encounter.component.html",
  styleUrls: ["./edit-encounter.component.css"]
})
//Component dealing with editing or adding an encounter.
export class EditEncounterComponent implements OnInit, OnDestroy {
  encounterForm: FormGroup;
  id: string;
  editMode = false;
  encounter: Encounter = new Encounter(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
  encounterSub: Subscription;
  error: string;
  errorSub: Subscription;
  patientId: string;
  constructor(
    private encounterService: EncounterService,
    private route: ActivatedRoute
  ) {}

  //Subscribes to route params. Sets id to the param, encounterId.
  //Sets patientId to the param patientId.
  //If this.id is not undefined, then we set edit mode to true and
  //make a call to the encounterService to get encounter by id.
  //Otherwise we set the encounter's patientId to this.patientId
  //and call initForm().
  //We subscribe to the encounterChange and errorChanged subjects in encounterService
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["encounterId"];
      this.patientId = params["patientId"];
      if (this.id != undefined) {
        this.encounterService.getEncounterById(this.id);
        this.editMode = true;
      } else {
        this.encounter["patientId"] = this.patientId;
        this.initForm();
      }
    });
    //When the encounter is not null, call initForm
    this.encounterSub = this.encounterService.encounterChanged.subscribe(
      response => {
        this.encounter = response;
        if (this.encounter != null && this.editMode) {
          this.initForm();
        }
      }
    );
    this.errorSub = this.encounterService.errorChanged.subscribe(response => {
      this.error = response;
    });
  }

  /*
    Create a new form group with formControls for each encounter.
    Each formControl has specific pattern validation.
    We call this later in the params subscription for adding an encounter,
    or in the encounterSub for editing an encounter.
  */
  private initForm() {
    this.encounterForm = new FormGroup({
      encounterId: new FormControl(this.encounter.encounterId),
      patientId: new FormControl(this.encounter.patientId),
      visitCode: new FormControl(this.encounter.visitCode, [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}\s{1}[0-9]{1}[A-Za-z]{1}[0-9]{1}$/
        )
      ]),
      provider: new FormControl(this.encounter.provider, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s.,/":;]*$/)
      ]),
      billingCode: new FormControl(this.encounter.billingCode, [
        Validators.required,
        Validators.pattern(/^\d{3}[.]\d{3}[.]\d{3}[-]\d{2}$/)
      ]),
      icd: new FormControl(this.encounter.icd, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]{1}\d{2}$/)
      ]),
      totalCost: new FormControl(this.encounter.totalCost, [
        Validators.required,
        Validators.pattern(/^[+]?([.]\d+|\d+([.]\d+)?)$/)
      ]),
      copay: new FormControl(this.encounter.copay, [
        Validators.required,
        Validators.pattern(/^[+]?([.]\d+|\d+([.]\d+)?)$/)
      ]),
      chiefComplaint: new FormControl(this.encounter.chiefComplaint, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s.,/":;]*$/)
      ]),
      pulse: new FormControl(this.encounter.pulse, [
        Validators.pattern(/^\d{1,3}$/)
      ]),
      systolic: new FormControl(this.encounter.systolic, [
        Validators.pattern(/^\d{1,3}$/)
      ]),
      diastolic: new FormControl(this.encounter.diastolic, [
        Validators.pattern(/^\d{1,3}$/)
      ]),
      notes: new FormControl(this.encounter.notes, [
        Validators.pattern(/^[A-Za-z\s.,/":;]*$/)
      ])
    });
  }

  /*
    If editMode is true, calls updateEncounter from encounterService
    Else, calls addEncounter from encounterService
    Passes the values from the form. 
  */
  onSubmit() {
    if (this.editMode) {
      this.encounterService.updateEncounter(this.encounterForm.value);
    } else {
      this.encounterService.addEncounter(this.encounterForm.value);
    }
  }

  //Unsubscripes from subscriptions
  ngOnDestroy() {
    this.encounterSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
