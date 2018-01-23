import * as fs from "fs";
import * as request from "request";

import { API_URL, API_KEY, API_DEFS, API_FREQ, MAX_DEFS, FREQ_OPTS } from "../config";
import { freemem } from "os";

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

    // see lexicon.spec.ts to see how to use this function
    public async getDefinitions(word: string): Promise<string[]> {
        const defs: string[] = [];

        return new Promise<string[]>((resolve: Function) => {
            request(API_URL + word + API_DEFS + API_KEY, (error, response, body) => {
                body = JSON.parse(body);
                for (let i = 0; i < body.length && i < MAX_DEFS; i++) {
                    defs.push(body[i].text);
                }
                resolve(defs);
            });
        });
    }

    // see lexicon.spec.ts to see how to use this function
    public async getFrequency(word: string): Promise<number> {
        let freq: number = 0;

        return new Promise<number>((resolve: Function) => {
            request(API_URL + word + API_FREQ + API_KEY + FREQ_OPTS, (error, response, body) => {
                body = JSON.parse(body);
                freq = body.totalCount;
                resolve(freq);
            });
        });
    }
}
