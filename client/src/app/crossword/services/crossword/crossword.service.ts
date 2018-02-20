import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CrosswordService {

    public constructor(private http: HttpClient) {}

    public generateGrid() {
        return this.http.get("http://localhost:3000/crossword-generator/generate-grid");
    }

}
