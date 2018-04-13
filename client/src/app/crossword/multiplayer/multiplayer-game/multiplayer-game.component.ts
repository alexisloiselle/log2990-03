import { Component, OnInit, ViewChild} from "@angular/core";
import { Difficulty } from "../../../../../../common/difficulty";
import { ActivatedRoute } from "@angular/router";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { DefinitionService } from "../../services/crossword/definition.service";
import { SocketService } from "../../services/socket.service";
import { GridComponent } from "../../grid/grid.component";
import { DefinitionsComponent } from "../../definitions/definitions.component";
import { Word } from "../../word";

// import {IMultiplayerGame} from "../../../../../../common/multiplayer-game"

@Component({
    selector: "app-multiplayer-game",
    templateUrl: "./multiplayer-game.component.html",
    styleUrls: ["./multiplayer-game.component.css"]
})
export class MultiplayerGameComponent implements OnInit {
    @ViewChild("grid") private grid: GridComponent;
    @ViewChild("definitions") private definitions: DefinitionsComponent;
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
        this.listenOpponentSelectedWords();
        this.isOpponentFound = false;
        this.isConfigured = false;
        this.playerName = "";
        this.opponentName = "";
        this.playerScore = 0;
        this.opponentScore = 0;
    }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe(async (params) => {
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

    private listenOpponentSelectedWords(): void {
        this.socketService.selectWord().subscribe((word) => {
            this.definitions.opponentSelectedWord = new Word(word.word.word.word,
                                                             word.word.word.definition,
                                                             word.word.word.isHorizontal,
                                                             word.word.word.line,
                                                             word.word.word.column);
        });
    }

    public isGridDefined(): boolean {
        return this.grid !== undefined;
    }

    public isDefinitionsDefined(): boolean {
        return this.definitions !== undefined;
    }

    private isGameEnded(): boolean {
        return this.grid === undefined ? false : this.grid.isCompleted();
    }

    public isYouWinning(): boolean {
        return this.playerScore > this.opponentScore;
    }
}
