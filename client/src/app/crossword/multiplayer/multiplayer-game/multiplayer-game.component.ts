import { Component, OnInit } from "@angular/core";
import { Difficulty } from "../../../../../../common/difficulty";
import { ActivatedRoute } from "@angular/router";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { DefinitionService } from "../../services/crossword/definition.service";
import { SocketService } from "../../services/socket.service";

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
    public thisPlayerName: string;
    public playerTwoName: string;
    public thisPlayerNumber: number;
    public playerTwoNumber: number;

    public constructor(
        private crosswordService: CrosswordService,
        private defService: DefinitionService,
        private route: ActivatedRoute,
        private socketService: SocketService
    ) {
        this.isOpponentFound = false;
        this.isConfigured = false;
        this.thisPlayerName = "";
        this.playerTwoName = "";
        this.thisPlayerNumber = 0;
        this.playerTwoNumber = 0;
    }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe(async (params) => {
            this.gameName = params.gamename;
            console.log(this.gameName);
            console.log(this.thisPlayerName);
            if (params.isjoingame === "true") {
                await this.opponentFound();
            } else {
                this.socketService.gameBegin().subscribe(async (isOpponentFound) => {
                    if (isOpponentFound) {
                        await this.opponentFound();
                    }
                });
            }
            this.thisPlayerName = params.playerName;
        });

    }

    public async opponentFound(): Promise<void> {
        this.isOpponentFound = true;
        this.defService.IsCheatModeOn = false;
        await this.crosswordService.getMultiplayerGrid(this.gameName);
        this.defService.configureDefinitions();
        this.isConfigured = true;
    }
}
