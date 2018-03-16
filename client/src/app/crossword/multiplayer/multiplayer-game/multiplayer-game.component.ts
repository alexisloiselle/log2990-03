import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-multiplayer-game",
    templateUrl: "./multiplayer-game.component.html",
    styleUrls: ["./multiplayer-game.component.css"]
})
export class MultiplayerGameComponent implements OnInit {

    public isOpponentFound: boolean;

    public constructor() {
        this.isOpponentFound = false;
    }

    public ngOnInit(): void {
    }

}
