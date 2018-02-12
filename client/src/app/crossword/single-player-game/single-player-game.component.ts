import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-single-player-game",
    templateUrl: "./single-player-game.component.html",
    styleUrls: ["./single-player-game.component.css"]
})
export class SinglePlayerGameComponent implements OnInit {

    public difficultyInFrench: string;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            const difficulty: string = params["difficulty"];
            if (difficulty === "easy") {
                this.difficultyInFrench = "Facile";
            } else if (difficulty === "medium") {
                this.difficultyInFrench = "Normal";
            } else if (difficulty === "hard") {
                this.difficultyInFrench = "Difficile";
            } else {
                this.router.navigateByUrl("/crossword");
            }
        });
    }

}
