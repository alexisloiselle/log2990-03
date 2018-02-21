import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// import { Game } from "../game";
import { CrosswordService } from "./../services/crossword/crossword.service";
import { FormattedGrid } from "../formatted-grid";

@Component({
    selector: "app-single-player-game",
    templateUrl: "./single-player-game.component.html",
    styleUrls: ["./single-player-game.component.css"]
})
export class SinglePlayerGameComponent implements OnInit {

    public difficulty: string;
    public fGrid: FormattedGrid;
    // private game: Game;

    public constructor(protected crosswordService: CrosswordService, private route: ActivatedRoute) { }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe((params) => {
            // this.difficulty = params["difficulty"];
            this.difficulty = "mock";
        });
        this.fGrid = await this.crosswordService.generateGrid(this.difficulty);
        // this.game = new Game(this.difficulty);
    }

}
