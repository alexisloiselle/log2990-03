import { Case } from "./case";
import { Difficulty } from "../../../../common/difficulty";

export class Game {

    private difficulty: Difficulty;
    private grid: Case[][];

    public constructor(difficulty: Difficulty) {
        this.difficulty = difficulty;
    }

    public get Grid(): Case[][] {
        return this.grid;
    }
}
