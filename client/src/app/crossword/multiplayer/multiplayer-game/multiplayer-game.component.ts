import { Component, OnInit } from "@angular/core";
import { Difficulty } from "../../../../../../common/difficulty";
import { ActivatedRoute } from "@angular/router";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { DefinitionService } from "../../services/crossword/definition.service";

@Component({
    selector: "app-multiplayer-game",
    templateUrl: "./multiplayer-game.component.html",
    styleUrls: ["./multiplayer-game.component.css"]
})
export class MultiplayerGameComponent implements OnInit {

    public isOpponentFound: boolean;
    public difficulty: Difficulty;
    public isConfigured: boolean;

    public constructor(
        private crosswordService: CrosswordService,
        private defService: DefinitionService,
        private route: ActivatedRoute
    ) {
        this.isOpponentFound = false;
        this.isConfigured = false;
    }

    public ngOnInit(): void {
    }

    public async opponentFound(): Promise<void> {
        this.isOpponentFound = true;
        this.route.params.subscribe((params) => {
            // this.difficulty = params.difficulty;
            this.difficulty = Difficulty.Mock;
        });
        this.defService.IsCheatModeOn = false;
        await this.crosswordService.generateGrid(this.difficulty);
        this.defService.configureDefinitions();
        this.isConfigured = true;
    }

}
