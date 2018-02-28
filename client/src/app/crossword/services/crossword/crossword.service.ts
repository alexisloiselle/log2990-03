import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormattedGrid } from "../../formatted-grid";
import { Difficulty } from "../../../../../../common/difficulty";
import { IMultiplayerGame } from "../../multiplayer/multiplayer-game";

@Injectable()
export class CrosswordService {

    private serverUrl: string = "http://localhost:3000/api/";
    private fGrid: FormattedGrid;

    public constructor(private http: HttpClient) { }

    public async generateGrid(difficulty: Difficulty): Promise<void> {
        this.fGrid = await this.http.get(`${this.serverUrl}crossword/${difficulty}`)
            .toPromise()
            .then((data: FormattedGrid) => data);
    }

    public async createGame(userName: string, gameName: string, difficulty: string): Promise<void> {
        const newGame: IMultiplayerGame = { userName1: userName, userName2: "", gameName: gameName, difficulty: difficulty };

        this.http.post(`${this.serverUrl}crossword/createNewGame`, newGame)
            .toPromise()
            .then((response) => {});
            // .catch(this.handleException);
    }

    public async isNameAlreadyUsed(gameName: string): Promise<boolean> {
        return this.http.get<boolean>(`${this.serverUrl}crossword/isNameAlreadyUsed/${gameName}`).toPromise();
    }

    public get FGrid(): FormattedGrid {
        return this.fGrid;
    }
}
