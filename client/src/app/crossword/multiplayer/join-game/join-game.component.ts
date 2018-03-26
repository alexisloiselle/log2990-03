import { Component, OnInit } from "@angular/core";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { IMultiplayerGame } from "../../../../../../common/multiplayer-game";
import { Router } from "@angular/router";
import { SocketService } from "../../services/socket.service";

@Component({
    selector: "app-join-game",
    templateUrl: "./join-game.component.html",
    styleUrls: ["./join-game.component.css"]
})

export class JoinGameComponent implements OnInit {

    public username: string;
    public games: IMultiplayerGame[];
    public isReady: boolean;
    public selectedGame: string;

    public constructor(
        private crosswordService: CrosswordService,
        private router: Router,
        private socketService: SocketService
    ) {
        this.username = "";
        this.games = [];
        this.isReady = false;
        this.selectedGame = "";
    }

    public async ngOnInit(): Promise<void> {
        this.socketService.connect();
        await this.crosswordService.getGames();
        this.games = this.crosswordService.Games;
        this.isReady = true;
    }

    public updateUsername(event: KeyboardEvent): void {
        this.username = (event.target as HTMLInputElement).value;
    }

    public isFormValid(): Boolean {
        return this.username !== "" &&
            this.selectedGame !== "";
    }

    public getBackgroundColor(gameName: string): string {
        if (gameName === this.selectedGame) {
            return "lightgray";
        } else {
            return "white";
        }
    }

    public async joinGame(): Promise<void> {
        this.socketService.joinGame(this.selectedGame);
        await this.crosswordService.updateMultiplayerGame(this.username, this.selectedGame);
        this.router.navigate(["multiplayer-game", this.selectedGame, true]);
    }
}
