import { Component, OnInit } from "@angular/core";
import { DefinitionService } from "../services/crossword/definitionService";

@Component({
    selector: "app-definitions",
    templateUrl: "./definitions.component.html",
    styleUrls: ["./definitions.component.css"]
})
export class DefinitionsComponent implements OnInit {

    public constructor(
        protected defService: DefinitionService
    ) { }

    public ngOnInit(): void {
    }
}
