import { Component, OnInit, OnDestroy } from "@angular/core";
import { EncounterService } from "../encounter.service";
import { Encounter } from "../encounter.model";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-encounter-detail",
  templateUrl: "./encounter-detail.component.html",
  styleUrls: ["./encounter-detail.component.css"]
})
export class EncounterDetailComponent implements OnInit, OnDestroy {
  encounter: Encounter;
  encounterSub: Subscription;
  id: string;
  constructor(
    private encounterService: EncounterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.encounterSub = this.encounterService.encounterChanged.subscribe(
      response => {
        this.encounter = response;
      }
    );
    this.route.params.subscribe((params: Params) => {
      this.id = params["encounterId"];
      this.encounterService.getEncounterById(this.id);
    });
  }
  onBack() {
    this.router.navigate(["patient-detail", this.encounter.patientId]);
  }
  ngOnDestroy() {
    this.encounterSub.unsubscribe();
  }
}
