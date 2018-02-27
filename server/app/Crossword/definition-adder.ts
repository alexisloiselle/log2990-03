import { Case } from "./case";
import { Word, Direction } from "./word";
import { Difficulty } from "../../../common/difficulty";
import * as request from "request";

export class DefinitionAdder {

    public static addWords(grid: Case[][], words: Word[]): void {
        for (const wordInfo of words) {
            let word: string = "";
            let line: number = wordInfo.Line;
            let column: number = wordInfo.Column;
            const orientation: Direction = wordInfo.Orientation;

            for (let i: number = 0; i < wordInfo.Length; i++) {
                word = word.concat(grid[line][column].RightLetter);
                orientation === Direction.Horizontal ? column++ : line++;
            }
            wordInfo.Word = word;
        }
    }

    public static async addDefinitions(words: Word[], difficulty: Difficulty): Promise<boolean> {
        for (const wordInfo of words) {
            //mettre url dans config
            const url: string = `http://localhost:3000/api/lexicon/definition/${wordInfo.Word}`;
            const definitions: string[] = await new Promise<string[]>((resolve: Function) => {
                // tslint:disable-next-line:no-any
                request(url, (error: any, response: any, body: any) => {
                    resolve(JSON.parse(body));
                });
            });
            wordInfo.Definition = difficulty === Difficulty.Easy || definitions.length <= 1 ? definitions[0] : definitions[1];
        }

        return true;
    }
}
