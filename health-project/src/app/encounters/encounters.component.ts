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
  filter = "";
  searchSelect = "visitCode";
  propNames = [
    { key: "visitCode", visual: "Visit Code" },
    { key: "billingCode", visual: "Billing Code" },
    { key: "icd", visual: "ICD 10" },
    { key: "encounterId", visual: "Encounter Id" }
  ];
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
