import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormattedGrid } from "../../formatted-grid";
import "rxjs/add/operator/map";

@Injectable()
export class CrosswordService {

    public serverUrl: string = "http://localhost:3000/api/";

    public constructor(private http: HttpClient) {
    }

    public generateGrid(difficulty: string): Promise<FormattedGrid> {
        console.log(`${this.serverUrl}crossword/${difficulty}`);
        return this.http.get(`${this.serverUrl}crossword/${difficulty}`)
            .toPromise()
            .then((data: any) => data as FormattedGrid);
    }
}
