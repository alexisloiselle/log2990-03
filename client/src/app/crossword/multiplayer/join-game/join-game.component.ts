import { Component, OnInit } from "@angular/core";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { IMultiplayerGame } from "../../../../../../common/multiplayer-game";

@Component({
    selector: "app-join-game",
    templateUrl: "./join-game.component.html",
    styleUrls: ["./join-game.component.css"]
})
export class JoinGameComponent implements OnInit {

    public username: String;
    public games: IMultiplayerGame[];
    public isReady: Boolean;
    public selectedGame: String;

    public constructor( private crosswordService: CrosswordService ) {
        this.username = "";
        this.games = [];
        this.isReady = false;
        this.selectedGame = "";
    }

    public async ngOnInit(): Promise<void> {
        await this.crosswordService.getGames();
        this.games = this.crosswordService.Games;
        this.isReady = true;
    }

    public updateUsername(event: KeyboardEvent): void {
        this.username = (event.target as HTMLInputElement).value;
    }

    public isFormValid(): Boolean {
        return this.username !== "";
    }

}
