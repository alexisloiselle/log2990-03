import { Component, OnInit, ViewChild } from "@angular/core";
import { Difficulty } from "../../../../../../common/difficulty";
import { ActivatedRoute, Router } from "@angular/router";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { DefinitionService } from "../../services/crossword/definition.service";
import { SocketService } from "../../services/socket.service";
import { GridComponent } from "../../grid/grid.component";
import { DefinitionsComponent } from "../../definitions/definitions.component";
import { Word } from "../../word";

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
        private socketService: SocketService,
        private router: Router
    ) {
        this.listenOpponentFoundWords();
        this.listenOpponentSelectedWords();
    }

    public async ngOnInit(): Promise<void> {
        this.resetAttributes();
        this.playerName = "";
        this.opponentName = "";
        this.difficulty = Difficulty.Mock;
        this.initSocket();
        this.isConfigured = true;
    }

    private initSocket(): void {
        this.route.params.subscribe(async (params) => {
            this.gameName = params.gamename;
            if (params.isjoingame === "true") {
                await this.opponentFound();
                this.opponentName = this.crosswordService.userNamePlayerOne;
                this.playerName = this.crosswordService.userNamePlayerTwo;
            } else {
                this.socketService.gameBegin().subscribe(async (isOpponentFound) => {
                    if (isOpponentFound) {
                        await this.opponentFound();
                        this.playerName = this.crosswordService.userNamePlayerOne;
                        this.opponentName = this.crosswordService.userNamePlayerTwo;
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
        this.defService.configureDefinitions();
    }

    private listenOpponentFoundWords(): void {
        this.socketService.wordCorrect().subscribe((response) => {
            if (response.isHost) {
                this.playerScore++;
            } else {
                this.definitions.addOpponentFoundWord(new Word(
                    response.word.word,
                    response.word.definition,
                    response.word.isHorizontal,
                    response.word.line,
                    response.word.column
                ));
                this.opponentScore++;
            }
        });
    }

    private listenOpponentSelectedWords(): void {
        this.socketService.selectWord().subscribe((response) => {
            this.definitions.opponentSelectedWord = new Word(
                response.word.word,
                response.word.definition,
                response.word.isHorizontal,
                response.word.line,
                response.word.column
            );
        });
    }

    public isGameOver(): boolean {
        return this.grid === undefined ? false : this.grid.isCompleted();
    }

    public currentPlayerWon(): boolean {
        return this.playerScore >= this.opponentScore;
    }

    public exitGame(): void {
        this.router.navigate(["homepage"]);
    }

    public async rematch(): Promise<void> {
        this.resetAttributes();
        this.grid.ngOnInit();
        this.definitions.ngOnInit();
        if (this.socketService.firstToRematch()) {
            this.socketService.rematch(this.gameName);
            this.socketService.gameBegin().subscribe(async (isOpponentFound) => {
                if (isOpponentFound) {
                    await this.opponentFound();
                }
            });
        } else {
            this.socketService.restartGame(this.gameName);
            await this.opponentFound();
        }
        this.socketService.resetFirstRematcher();
    }

    public resetAttributes(): void {
        this.isOpponentFound = false;
        this.isConfigured = false;
        this.playerScore = 0;
        this.opponentScore = 0;
    }
}
