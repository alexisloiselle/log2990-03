import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-create-game",
    templateUrl: "./create-game.component.html",
    styleUrls: ["./create-game.component.css"]
})
export class CreateGameComponent implements OnInit {

    public difficulty: string;
    public userName: string;
    public gameName: string;
    public nameAlreadyUsed: boolean;

    public test: string;

    public constructor() {
        this.gameName = "";
        this.difficulty = "";
        this.nameAlreadyUsed = false;
        this.test = "I love Mimi";
    }

    public ngOnInit(): void {
    }

    public updateUsername(event:any): void {
        this.userName = event.target.value;
    }

    public updateGameName(event: any): void {
        this.gameName = event.target.value;
        this.nameAlreadyUsed = (this.gameName === this.test);
    }

    public isFormValid(): boolean {
        return (this.gameName.length !== 0 && this.difficulty !== "" && !this.nameAlreadyUsed && this.userName.length !== 0);
    }

    public setDifficulty(difficulty: string): void {
        this.difficulty = difficulty;
    }

}
