import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IFormattedGrid } from "../../formatted-grid";
import { Difficulty } from "../../../../../../common/difficulty";
import { API_URL, CROSSWORD_PARAM } from "../../../config";

@Injectable()
export class CrosswordService {

    private formattedGrid: IFormattedGrid;

    public constructor(private http: HttpClient) { }

    public async generateGrid(difficulty: Difficulty): Promise<void> {
        this.formattedGrid = await this.http.get(`${API_URL}/${CROSSWORD_PARAM}/${difficulty}`)
            .toPromise()
            .then((data: IFormattedGrid) => data);
    }

    public get FormattedGrid(): IFormattedGrid {
        return this.formattedGrid;
    }
}
