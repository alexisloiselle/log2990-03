import * as fs from "fs";
import * as request from "request";

import {
    API_URL,
    API_DEFS,
    MAX_DEFS,
    USELESS_CHAR
} from "../config";

export class Lexicon {

    private commonWords: string[];
    private uncommonWords: string[];

    constructor() { // no param
        this.readFiles();
    }

    // see lexicon.spec.ts to see how to use this function
    public static async getDefinitions(word: string): Promise<string[]> {
        let definitions: string[] = [];
        const url: string = `${API_URL}${word}&${API_DEFS}`;

        return new Promise<string[]>((resolve: Function) => {
            /* tslint:disable-next-line */
            request(url, (error: any, response: any, body: any) => {
                body = JSON.parse(body);
                definitions = body[0].defs.slice(0, MAX_DEFS).map((def: string) => {
                    return def.slice(USELESS_CHAR);
                });
                resolve(definitions);
            });
        });
    }

    private readFiles(): void {
        this.commonWords = fs.readFileSync("app/common_words.txt", "utf8").split("\r\n");
        this.uncommonWords = fs.readFileSync("app/uncommon_words.txt", "utf8").split("\r\n");
    }

    public getAllWords(): string[] {
        return this.commonWords.concat(this.uncommonWords);
    }

    public getWordsByLength(length: number, isUncommon: boolean): string[] {
        const res: string[] = isUncommon ? this.uncommonWords : this.commonWords;

        return res.filter((word: string) => word.length === length);
    }

    // pattern example -> ' e at '
    public getWordsFromPattern(pattern: string, isUncommon: boolean): string[] {
        return this.getWordsByLength(pattern.length, isUncommon).filter((word: string) => {
            return RegExp(pattern.replace(/ /g, "[a-z]")).test(word);
        });
    }
}
