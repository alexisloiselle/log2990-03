import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormattedGrid } from "../../formatted-grid";

@Injectable()
export class CrosswordService {

    private serverUrl: string = "http://localhost:3000/api/";
    private fGrid: FormattedGrid;

    public constructor(private http: HttpClient) { }

    public async generateGrid(difficulty: string): Promise<void> {
        this.fGrid = await this.http.get(`${this.serverUrl}crossword/${difficulty}`)
            .toPromise()
            .then((data: FormattedGrid) => data);
    }

    public get FGrid(): FormattedGrid {
        return this.fGrid;
    }
}
