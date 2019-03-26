import { Component, OnInit, OnDestroy } from "@angular/core";
import { EncounterService } from "../encounter.service";
import { Encounter } from "../encounter.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as appStuff from "../../store/app.state";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-encounter-detail",
  templateUrl: "./encounter-detail.component.html",
  styleUrls: ["./encounter-detail.component.css"]
})
export class EncounterDetailComponent implements OnInit {
  encounter: Encounter;
  id: string;
  constructor(
    private encounterService: EncounterService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<appStuff.AppState>
  ) {}

  /*
    Subscribes to encounterChanged from encounterService
    Sets this.encounter equal to what is returned from the subscription.
    Subscribes to route params. Sets the encounterId and then calls getEncounterById
  */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["encounterId"];
      this.encounterService.getEncounterById(this.id);
      this.store.select("encounterStuff").subscribe(result => {
        this.encounter = result.encounter;
      });
    });
  }
  //Navigates back to patient-detail of the patient who's encounter we are trying to update.
  onBack() {
    this.router.navigate(["patients/patient-detail", this.encounter.patientId]);
  }

  //Placeholder if I ever want add delete encounter.
  onDelete() {
    console.log("Cannot delete");
  }
}
