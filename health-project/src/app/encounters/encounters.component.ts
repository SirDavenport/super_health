import { Component, OnInit, Input } from "@angular/core";
import { Encounter } from "./encounter.model";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { EncounterService } from "./encounter.service";
import { Store } from "@ngrx/store";
import * as encounterStuff from "./store/encounters.reducers";
import { Observable } from "rxjs";

@Component({
  selector: "app-encounters",
  templateUrl: "./encounters.component.html",
  styleUrls: ["./encounters.component.css"]
})
export class EncountersComponent implements OnInit {
  encountersState: Observable<{ encounters: Encounter[] }>;
  patientId: string;
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
    private encounterService: EncounterService,
    private store: Store<encounterStuff.AppState>
  ) {}

  /**
   * Subscribes to route params
   * Sets patientId to the param passed
   * Calls getEncountersByPatientApi from encounterService.
   * Subscribes to the encountersChanged subject from encounterService
   * Sets this.encounters to whats returned.
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.patientId = params["patientId"];
      this.encounterService.getEncountersByPatientApi(this.patientId);
      this.encountersState = this.store.select("encounterStuff");
    });
  }

  //When the row of the table is clicked, navigate to the encounter detail.
  onRowClick(id: string) {
    this.router.navigate(["encounter-detail", id]);
  }
}
