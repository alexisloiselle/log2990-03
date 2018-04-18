import { Component, OnInit } from "@angular/core";
import { RaceAdministratorService } from "../../race-services/race-administrator.service";
import { BestTimeService } from "../best-times-array/best-time.service";

@Component({
  selector: "app-race-result",
  templateUrl: "./race-result.component.html",
  styleUrls: ["./race-result.component.css"],
  providers: [RaceAdministratorService, BestTimeService]

})

export class RaceResultComponent implements OnInit {

  public constructor(
    public raceAdministratorService: RaceAdministratorService,
    public bestTimeService: BestTimeService
  ) {
  }

  public ngOnInit(): void { }

}
