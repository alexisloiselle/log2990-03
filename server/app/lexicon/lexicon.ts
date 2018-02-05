import * as fs from "fs";
import * as request from "request";

import {
    API_URL,
    API_DEFS,
    API_FREQ,
    MAX_DEFS,
    MAX_FREQ,
    USELESS_CHAR
} from "../config";

export class Lexicon {

    public allWords: string[];

    constructor(file: string) {
        this.readFile(file);
    }

    // see lexicon.spec.ts to see how to use this function
    public static async getDefinitions(word: string): Promise<string[]> {
        let definitions: string[] = [];
        const url: string = `${API_URL}${word}&${API_DEFS}`;

        return new Promise<string[]>((resolve: Function) => {
            request(url, (error: any, response: any, body: any) => {
                body = JSON.parse(body);
                definitions = body[0].defs.slice(0, MAX_DEFS).map((def: string) => {
                    return def.slice(USELESS_CHAR);
                });
                resolve(definitions);
            });
        });
    }

    // see lexicon.spec.ts to see how to use this function
    public static async getFrequency(word: string): Promise<number> {
        let freq: number = 0;
        const url: string = `${API_URL}${word}&${API_FREQ}`;

        return new Promise<number>((resolve: Function) => {
            request(url, (error: any, response: any, body: any) => {
                body = JSON.parse(body);
                freq = body[0].tags[0].slice(USELESS_CHAR);
                resolve(+freq);
            });
        });
    }

    public static async isUncommon(word: string): Promise<boolean> {
        return await this.getFrequency(word) <= MAX_FREQ;
    }

    private readFile(file: string): void {
        this.allWords = fs.readFileSync(file, "utf8").split("\r\n");
    }

    public getWordsByLength(length: number): string[] {
        return this.allWords.filter((word: string) => word.length === length);
    }

    // pattern example -> ' e at '
    public getWordsFromPattern(pattern: string): string[] {
        return this.getWordsByLength(pattern.length).filter((word: string) => {
            return RegExp(pattern.replace(/ /g, "[a-z]")).test(word);
        });
    }
}
