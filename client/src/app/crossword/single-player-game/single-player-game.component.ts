import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CrosswordService } from "../services/crossword/crossword.service";
import { DefinitionService } from "../services/crossword/definition.service";

@Component({
    selector: "app-single-player-game",
    templateUrl: "./single-player-game.component.html",
    styleUrls: ["./single-player-game.component.css"]
})
export class SinglePlayerGameComponent implements OnInit {

    public difficulty: string;
    public isConfigured: boolean = false;

    public constructor(
        private crosswordService: CrosswordService,
        private defService: DefinitionService,
        private route: ActivatedRoute
    ) { }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe((params) => {
            // this.difficulty = params.difficulty;
            this.difficulty = "mock";
        });
        this.defService.IsCheatModeOn = false;
        await this.crosswordService.generateGrid(this.difficulty);
        this.defService.configureDefinitions();
        this.isConfigured = true;
    }
}
