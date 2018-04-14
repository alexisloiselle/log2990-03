import { Component, OnInit } from "@angular/core";
import { BestTimeService } from "./best-time.service";

@Component({
    selector: "app-best-times-array",
    templateUrl: "./best-times-array.component.html",
    styleUrls: ["./best-times-array.component.css"]
})
export class BestTimesArrayComponent implements OnInit {

    public constructor(
        public bestTimeService: BestTimeService
    ) {
    }

    public ngOnInit(): void { }
}
