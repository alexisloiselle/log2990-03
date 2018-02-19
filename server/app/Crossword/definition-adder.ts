import { Case } from "./case";
import { Lexicon } from "../lexicon/lexicon";
import { Word, Direction } from "./word";

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

    public static async addDefinitions(words: Word[], difficulty: string): Promise<boolean> {
        for (const wordInfo of words) {
            const definitions: string[] = await Lexicon.getDefinitions(wordInfo.Word);
            wordInfo.Definition = difficulty === "easy" || definitions.length <= 1 ? definitions[0] : definitions[1];
        }

        return true;
    }
}
