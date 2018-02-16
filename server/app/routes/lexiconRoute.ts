import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { Lexicon } from "../lexicon/lexicon";

module Route {

    @injectable()
    export class LexiconRoute {

        public getAllWords(req: Request, res: Response, next: NextFunction): void {
            const lexicon: Lexicon = new Lexicon();
            const words: string[] = lexicon.getAllWords();
            res.send(words);
        }

        public async getDefinitions(req: Request, res: Response, next: NextFunction): Promise<void> {
            const word: string = (req.params.word as string);
            const defs: string[] = await Lexicon.getDefinitions(word);
            res.send(defs);
        }

        public getCommonWithPattern(req: Request, res: Response, next: NextFunction): void {
            const lexicon: Lexicon = new Lexicon();
            const pattern: string = (req.params.pattern as string);
            const words: string[] = lexicon.getWordsFromPattern(pattern, false);
            res.send(words);
        }

        public getUncommonWithPattern(req: Request, res: Response, next: NextFunction): void {
            const lexicon: Lexicon = new Lexicon();
            const pattern: string = (req.params.pattern as string);
            const words: string[] = lexicon.getWordsFromPattern(pattern, true);
            res.send(words);
        }
    }
}

export = Route;
