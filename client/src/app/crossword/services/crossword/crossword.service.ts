import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormattedGrid } from "../../formatted-grid";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CrosswordService {

    public serverUrl: string = "http://localhost:3000/";

    public constructor(private http: HttpClient) {
    }

    public generateGrid(difficulty: string) {
        return this.http.get(`${this.serverUrl}crossword/${difficulty}`);
    }
}
