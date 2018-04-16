import { Component, OnInit, ViewChild } from "@angular/core";
import { Difficulty } from "../../../../../../common/difficulty";
import { ActivatedRoute, Router } from "@angular/router";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { DefinitionService } from "../../services/crossword/definition.service";
import { SocketService } from "../../services/socket.service";
import { GridComponent } from "../../grid/grid.component";

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

    public constructor(
        private crosswordService: CrosswordService,
        private defService: DefinitionService,
        private route: ActivatedRoute,
        private socketService: SocketService,
        private router: Router
    ) {
        this.isOpponentFound = false;
        this.isConfigured = false;
    }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe(async (params) => {
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
        this.defService.configureDefinitions();
        this.isConfigured = true;
    }

    public isGameOver(): boolean {
        return this.grid === undefined ? false : this.grid.isCompleted();
    }

    public currentPlayerWon(): boolean {
        return true;
    }

    public exitGame(): void {
        this.router.navigate(["homepage"]);
    }

    public async rematch(): Promise<void> {
        this.route.params.subscribe(async (params) => {
            if (params.isjoingame === "false") {
                this.isOpponentFound = false;
                this.isConfigured = false;
                this.socketService.gameBegin().subscribe(async (isOpponentFound) => {
                    if (isOpponentFound) {
                        await this.opponentFound();
                    }
                });
            } else {
                await this.opponentFound();
                this.socketService.restartGame(this.gameName);
            }
        });
    }
}
