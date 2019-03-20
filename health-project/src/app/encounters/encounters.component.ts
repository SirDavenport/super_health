import { Component, OnInit, Input } from "@angular/core";
import { Encounter } from "./encounter.model";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-encounters",
  templateUrl: "./encounters.component.html",
  styleUrls: ["./encounters.component.css"]
})
export class EncountersComponent implements OnInit {
  @Input() encounters: Encounter[];
  patientId: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.patientId = params["patientId"];
    });
  }

  onRowClick(id: string) {
    this.router.navigate(["/encounter-detail", id]);
  }
}
