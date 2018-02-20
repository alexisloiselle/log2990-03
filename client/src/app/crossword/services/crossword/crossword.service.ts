import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormattedGrid } from "../../formatted-grid";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CrosswordService {

    public constructor(private http: HttpClient) {}

    public generateGrid(): Observable<FormattedGrid> {
        return this.http.get("http://localhost:3000/crossword-generator/generate-grid")
            .map(res => res.json() as FormattedGrid);
    }
}
