import * as fs from "fs";

export class Lexicon {

    public allWords: string[];

    constructor(file: string) {
        this.readFile(file);
    }

    public readFile(file: string): void {
        this.allWords = fs.readFileSync(file, "utf8").split("\r\n");
    }

    public getWordsByLength(length: number): string[] {
        return this.allWords.filter((word: string) => word.length === length);
    }
}
