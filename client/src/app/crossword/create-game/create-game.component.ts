import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-create-game",
    templateUrl: "./create-game.component.html",
    styleUrls: ["./create-game.component.css"]
})
export class CreateGameComponent implements OnInit {

    public difficulty: string;
    public gameName: string;

    public constructor() {
        this.gameName = "";
        this.difficulty = "";
    }

    public ngOnInit(): void {
    }

    public updateGameName(event: any): void {
        this.gameName = event.target.value;
    }

    public isFormValid(): boolean {
        return (this.gameName.length !== 0 && this.difficulty !== "");
    }

    public setDifficulty(difficulty: string): void {
        this.difficulty = difficulty;
    }

}
