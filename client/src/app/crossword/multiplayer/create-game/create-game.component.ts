import { Component, OnInit } from "@angular/core";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-create-game",
    templateUrl: "./create-game.component.html",
    styleUrls: ["./create-game.component.css"]
})
export class CreateGameComponent implements OnInit {

    public difficulty: string;
    public username: string;
    public gameName: string;
    public isNameAlreadyUsed: boolean;

    public constructor( private router: Router,
                        private crosswordService: CrosswordService ) {
        this.gameName = "";
        this.difficulty = "";
        this.isNameAlreadyUsed = false;
        this.username = "";
    }

    public ngOnInit(): void {
    }

    public updateUsername(event: KeyboardEvent): void {
        this.username = (event.target as HTMLInputElement).value;
    }

    public async updateGameName(event: KeyboardEvent): Promise<void> {
        this.gameName = (event.target as HTMLInputElement).value;
    }

    public isFormValid(): boolean {
        return (this.gameName.length !== 0 && this.difficulty !== "" && this.username.length !== 0);
    }

    public setDifficulty(difficulty: string): void {
        this.difficulty = difficulty;
    }

    public async createGame(): Promise<void> {
        await this.crosswordService.isNameAlreadyUsed(this.gameName)
            .then((isAlreadyUsed: boolean) => (this.isNameAlreadyUsed = isAlreadyUsed));
        if (!this.isNameAlreadyUsed ) {
            // await this.crosswordService.createGame(this.gameName, this.username, this.difficulty);
            this.router.navigate(["multiplayer-game", this.gameName]);
        }
    }

}
