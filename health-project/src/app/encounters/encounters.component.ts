import { Component, OnInit, Input } from "@angular/core";
import { Encounter } from "./encounter.model";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { EncounterService } from "./encounter.service";

@Component({
  selector: "app-encounters",
  templateUrl: "./encounters.component.html",
  styleUrls: ["./encounters.component.css"]
})
export class EncountersComponent implements OnInit {
  encounters: Encounter[];
  patientId: string;
  encounterSub: Subscription;
  filter = "";
  searchSelect = "visitCode";
  propNames = [
    { key: "visitCode", visual: "Visit Code" },
    { key: "billingCode", visual: "Billing Code" },
    { key: "icd", visual: "ICD 10" },
    { key: "encounterId", visual: "Encounter Id" }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encounterService: EncounterService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.patientId = params["patientId"];
      this.encounterService.getEncountersByPatientApi(this.patientId);
    });
    this.encounterSub = this.encounterService.encountersChanged.subscribe(
      (response: Encounter[]) => {
        this.encounters = response;
      }
    );
  }

  onRowClick(id: string) {
    this.router.navigate(["/encounter-detail", id]);
  }
}
