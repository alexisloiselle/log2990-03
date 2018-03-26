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

    public constructor(
        private crosswordService: CrosswordService,
        private defService: DefinitionService,
        private route: ActivatedRoute,
        private socketService: SocketService
    ) {
        this.isOpponentFound = false;
        this.isConfigured = false;
    }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe(async (params) => {
            this.gameName = params.gamename;
            // TODO pas sur si cest une bonne pratique de mettre un booleen direct dans l'url
            // mais si ta pas le temps de changer, ca va faire l'affaire pour l'instant
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

}
