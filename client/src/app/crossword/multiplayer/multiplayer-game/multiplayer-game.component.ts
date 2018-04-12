import { Component, OnInit, ViewChild} from "@angular/core";
import { Difficulty } from "../../../../../../common/difficulty";
import { ActivatedRoute } from "@angular/router";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { DefinitionService } from "../../services/crossword/definition.service";
import { SocketService } from "../../services/socket.service";
import { GridComponent } from "../../grid/grid.component";

// import {IMultiplayerGame} from "../../../../../../common/multiplayer-game"

@Component({
    selector: "app-multiplayer-game",
    templateUrl: "./multiplayer-game.component.html",
    styleUrls: ["./multiplayer-game.component.css"]
})
export class MultiplayerGameComponent implements OnInit {
    @ViewChild("grid") private grid: GridComponent;
    public isOpponentFound: boolean;
    public difficulty: Difficulty;
    public isConfigured: boolean;
    private gameName: string;
    public playerName: string;
    public playerScore: number;
    public opponentName: string;
    public opponentScore: number;

    public constructor(
        private crosswordService: CrosswordService,
        private defService: DefinitionService,
        private route: ActivatedRoute,
        private socketService: SocketService
    ) {
        this.listenOpponentFoundWords();
        this.isOpponentFound = false;
        this.isConfigured = false;
        this.playerName = "";
        this.opponentName = "";
        this.playerScore = 0;
        this.opponentScore = 0;
    }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe(async (params) => { //params -> recoit par URL (paramètres)
            this.gameName = params.gamename;
            if (params.isjoingame === "true") {
                await this.opponentFound();
                (this.opponentName = this.crosswordService.userNamePlayerOne);
                (this.playerName = this.crosswordService.userNamePlayerTwo);
            } else {
                this.socketService.gameBegin().subscribe(async (isOpponentFound) => {
                    if (isOpponentFound) {
                        await this.opponentFound();
                        (this.playerName = this.crosswordService.userNamePlayerOne);
                        (this.opponentName = this.crosswordService.userNamePlayerTwo);
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
        // this.playerOneName = this.crosswordService.userNamePlayerOne;
        // this.playerTwoName = this.crosswordService.userNamePlayerTwo;
        this.defService.configureDefinitions();
        this.isConfigured = true;
    }

    private listenOpponentFoundWords(): void {
        this.socketService.wordCorrect().subscribe((word) => {
            // console.log(word);
            if (word.word.isHost) {
                this.playerScore += 1;
            } else {
                this.opponentScore += 1;
            }
            // this.placeWord(tempWord);
        });
    }

    private isGameEnded(): boolean {
        return this.grid === undefined ? false : this.grid.isCompleted();
    }

    public isYouWinning(): boolean {
        return this.playerScore > this.opponentScore;
    }
}
