import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IFormattedGrid } from "../../formatted-grid";
import { Difficulty } from "../../../../../../common/difficulty";

@Injectable()
export class CrosswordService {

    private serverUrl: string = "http://localhost:3000/api/";
    private fGrid: IFormattedGrid;

    public constructor(private http: HttpClient) { }

    public async generateGrid(difficulty: Difficulty): Promise<void> {
        this.fGrid = await this.http.get(`${this.serverUrl}crossword/${difficulty}`)
            .toPromise()
            .then((data: IFormattedGrid) => data);
    }

    public get FGrid(): IFormattedGrid {
        return this.fGrid;
    }
}
