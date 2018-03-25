import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Difficulty } from "../../../../../common/difficulty";

@Component({
    selector: "app-single-player-menu",
    templateUrl: "./single-player-menu.component.html",
    styleUrls: ["./single-player-menu.component.css"]
})
export class SinglePlayerMenuComponent implements OnInit {

    public difficulty: Difficulty;

    public constructor(private router: Router) {
    }

    public ngOnInit(): void { }

    public goToGame(difficulty: string): void {
        this.difficulty = difficulty as Difficulty;
        this.router.navigate(["single-player-game", this.difficulty]);
    }
}
