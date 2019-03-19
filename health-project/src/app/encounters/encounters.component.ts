import { Component, OnInit, Input } from "@angular/core";
import { Encounter } from "./encounter.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-encounters",
  templateUrl: "./encounters.component.html",
  styleUrls: ["./encounters.component.css"]
})
export class EncountersComponent implements OnInit {
  @Input() encounters: Encounter[];
  constructor(private router: Router) {}

  ngOnInit() {}

  onRowClick(id: string) {
    this.router.navigate(["/encounter-detail", id]);
  }
}
