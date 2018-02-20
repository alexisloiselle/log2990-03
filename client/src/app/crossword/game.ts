import { Case } from "./case";

export class Game {

    private difficulty: string;
    private grid: Case[][];

    public constructor(difficulty: string) {
        this.difficulty = difficulty;
    }

    public get Grid(): Case[][] {
        return this.grid;
    }
}
