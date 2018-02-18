import { Case } from "./case";
import { Word } from "./word";

export class Grid {
    private cases: Case[][];
    private words: Word[];

    constructor(cases: Case[][], words: Word[]) {
        this.cases = cases;
        this.words = words;
    }

    get Cases(): Case[][] {
        return this.cases;
    }

    get Words(): Word[] {
        return this.words;
    }
}
