import { Component, OnInit } from "@angular/core";
import { Difficulty } from "../../../../../../common/difficulty";
import { ActivatedRoute } from "@angular/router";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { DefinitionService } from "../../services/crossword/definition.service";
import { SocketService } from "../../services/socket.service";
// import {IMultiplayerGame} from "../../../../../../common/multiplayer-game"

@Component({
    selector: "app-multiplayer-game",
    templateUrl: "./multiplayer-game.component.html",
    styleUrls: ["./multiplayer-game.component.css"]
})
export class MultiplayerGameComponent implements OnInit {

    public isOpponentFound: boolean;
    public difficulty: Difficulty;
    public isConfigured: boolean;
    private gameName: string;
    public playerTwoName: string;
    public playerOneName: string;
    public playerOneNumber: number;
    public playerTwoNumber: number;
    
    public constructor(
        private crosswordService: CrosswordService,
        private defService: DefinitionService,
        private route: ActivatedRoute,
        private socketService: SocketService
    ) {
        this.isOpponentFound = false;
        this.isConfigured = false;
        this.playerTwoName = "";
        this.playerOneName = "";
        this.playerOneNumber = 0;
        this.playerTwoNumber = 0;
    }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe(async (params) => { //params -> recoit par URL (paramètres)
            this.gameName = params.gamename;
            if (params.isjoingame === "true") {
                await this.opponentFound();
            } else {
                this.socketService.gameBegin().subscribe(async (isOpponentFound) => {
                    if (isOpponentFound) {
                        await this.opponentFound();
                    }
                });
            }
        });

    }

    public async opponentFound(): Promise<void> {
        this.isOpponentFound = true;
        this.defService.IsCheatModeOn = false;
        await this.crosswordService.getMultiplayerGrid(this.gameName);
        await this.crosswordService.getUserNames(this.gameName);
        this.playerOneName = this.crosswordService.userNamePlayerOne;
        this.playerTwoName = this.crosswordService.userNamePlayerTwo;
        this.defService.configureDefinitions();
        this.isConfigured = true;
    }
}
