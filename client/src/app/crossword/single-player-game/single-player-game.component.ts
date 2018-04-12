import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CrosswordService } from "../services/crossword/crossword.service";
import { DefinitionService } from "../services/crossword/definition.service";
import { Difficulty } from "../../../../../common/difficulty";
import { GridComponent } from "../grid/grid.component";

@Component({
    selector: "app-single-player-game",
    templateUrl: "./single-player-game.component.html",
    styleUrls: ["./single-player-game.component.css"]
})
export class SinglePlayerGameComponent implements OnInit {
    @ViewChild("grid") private grid: GridComponent;

    public difficulty: Difficulty;
    public isConfigured: boolean;

    public constructor(
        private crosswordService: CrosswordService,
        private defService: DefinitionService,
        private route: ActivatedRoute
    ) {
        this.isConfigured = false;
    }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe((params) => {
            // this.difficulty = params.difficulty;
            this.difficulty = Difficulty.Mock;
        });
        this.defService.IsCheatModeOn = false;
        await this.crosswordService.generateGrid(this.difficulty);
        this.defService.configureDefinitions();
        this.isConfigured = true;
    }

    public isGridCompleted(): boolean {
        return this.grid.isCompleted();
    }
}
