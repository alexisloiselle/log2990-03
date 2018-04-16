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
        this.initSocket();

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
        this.isConfigured = true;
    }

    private listenOpponentFoundWords(): void {
        this.socketService.wordCorrect().subscribe((res) => {
            if (res.isHost) {
                this.playerScore++;
            } else {
                this.opponentScore++;
            }
        });
    }

    private listenOpponentSelectedWords(): void {
        this.socketService.selectWord().subscribe((res) => {
            this.definitions.opponentSelectedWord = new Word(
                res.word.word,
                res.word.definition,
                res.word.isHorizontal,
                res.word.line,
                res.word.column
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
