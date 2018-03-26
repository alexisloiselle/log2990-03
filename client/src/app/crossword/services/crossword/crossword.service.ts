import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IFormattedGrid } from "../../formatted-grid";
import { Difficulty } from "../../../../../../common/difficulty";
import { IMultiplayerGame } from "../../../../../../common/multiplayer-game";
import { API_URL, CROSSWORD_PARAM } from "../../../config";

@Injectable()
export class CrosswordService {

    private formattedGrid: IFormattedGrid;
    private games: IMultiplayerGame[];

    public constructor(private http: HttpClient) { }

    public async generateGrid(difficulty: Difficulty): Promise<void> {
        this.formattedGrid = await this.http.get(`${API_URL}/${CROSSWORD_PARAM}/getGrid/${difficulty}`)
            .toPromise()
            .then((data: IFormattedGrid) => data);
    }

    public async createGame(userName: string, gameName: string, difficulty: string): Promise<void> {
        // TODO cest pas de meme quon initialise une interface, cest justement pour ca que ca existe
        // newGameInfo.userName1 = userName;
        // newGameInfo.userName2 = "";
        // newGameInfo.gameName = gameName;
        // newGameInfo.difficulty = difficulty;
        const newGame: IMultiplayerGame = { userName1: userName, userName2: "", gameName: gameName, difficulty: difficulty };

        this.http.post(`${API_URL}/${CROSSWORD_PARAM}/createNewGame`, newGame).toPromise();
    }

    public async isNameAlreadyUsed(gameName: string): Promise<boolean> {
        return this.http.get<boolean>(`${API_URL}/${CROSSWORD_PARAM}/isNameAlreadyUsed/${gameName}`).toPromise();
    }

    public async getGames(): Promise<void> {
        this.games = await this.http.get(`${API_URL}/${CROSSWORD_PARAM}/getGames`)
            .toPromise()
            .then((games: IMultiplayerGame[]) => games);
    }

    public async getMultiplayerGrid(gameName: string): Promise<void> {
        this.formattedGrid = await this.http.get(`${API_URL}/${CROSSWORD_PARAM}/getMultiplayerGrid/${gameName}`)
            .toPromise()
            .then((data: IFormattedGrid) => data);
    }

    public async updateMultiplayerGame(userName: string, gameName: string): Promise<void> {
        // TODO cest pas de meme quon initialise une interface, cest justement pour ca que ca existe
        const newGameInfo: IMultiplayerGame = { userName1: "", userName2: userName, gameName: gameName, difficulty: "" };

        this.http.post(`${API_URL}/${CROSSWORD_PARAM}/updateMultiplayerGame`, newGameInfo).toPromise();
    }

    public get FormattedGrid(): IFormattedGrid {
        return this.formattedGrid;
    }

    public get Games(): IMultiplayerGame[] {
        return this.games;
    }
}
