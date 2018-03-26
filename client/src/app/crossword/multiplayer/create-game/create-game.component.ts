import { Component, OnInit } from "@angular/core";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { Router } from "@angular/router";
import { SocketService } from "../../services/socket.service";

@Component({
    selector: "app-create-game",
    templateUrl: "./create-game.component.html",
    styleUrls: ["./create-game.component.css"]
})
export class CreateGameComponent implements OnInit {

    // TODO utiliser la classe difficulty dans common
    public difficulty: string;
    public username: string;
    public gameName: string;
    public isNameAlreadyUsed: boolean;

    public constructor(
        private router: Router,
        private crosswordService: CrosswordService,
        private socketService: SocketService
    ) {
        this.gameName = "";
        this.difficulty = "";
        this.isNameAlreadyUsed = false;
        this.username = "";
    }

    public ngOnInit(): void {
        this.socketService.connect();
    }

    public updateUsername(event: KeyboardEvent): void {
        this.username = (event.target as HTMLInputElement).value;
    }

    public async updateGameName(event: KeyboardEvent): Promise<void> {
        this.gameName = (event.target as HTMLInputElement).value;
    }

    public isFormValid(): boolean {
        return this.gameName.length !== 0 &&
            this.difficulty !== "" &&
            this.username.length !== 0;
    }

    public async createGame(): Promise<void> {
        this.isNameAlreadyUsed = await this.crosswordService.isNameAlreadyUsed(this.gameName);
        if (!this.isNameAlreadyUsed) {
            await this.crosswordService.createGame(this.username, this.gameName, this.difficulty);
            this.socketService.newGame(this.gameName);
            this.router.navigate(["multiplayer-game", this.gameName, false]);
        }
    }
}
