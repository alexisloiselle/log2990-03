import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Game } from "../game";

@Component({
    selector: "app-single-player-game",
    templateUrl: "./single-player-game.component.html",
    styleUrls: ["./single-player-game.component.css"]
})
export class SinglePlayerGameComponent implements OnInit {

    public difficulty: string;
    private game: Game;

    public constructor(private route: ActivatedRoute, private router: Router) { }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.difficulty = params["difficulty"];
        });
        this.game = new Game(this.difficulty);
    }

}
