import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CrosswordService {

    public serverUrl: string;

    public constructor(private http: HttpClient) {
        this.serverUrl = "http://localhost:3000/";
    }

    public generateGrid() {
        return this.http.get(this.serverUrl + "crossword-generator/generate-grid");
    }

}
