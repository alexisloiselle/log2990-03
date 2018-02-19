import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-single-player-menu",
    templateUrl: "./single-player-menu.component.html",
    styleUrls: ["./single-player-menu.component.css"]
})
export class SinglePlayerMenuComponent implements OnInit {

    public difficulty: string;

    constructor(private router: Router) {
    }

    ngOnInit() {

    }

    public goToGame(difficulty: string): void {
        this.difficulty = difficulty;
        document.getElementById("test").innerHTML = this.difficulty;
        this.router.navigate(["single-player-game", this.difficulty]);
    }

}
