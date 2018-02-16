import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { Lexicon } from "../lexicon/lexicon";

module Route {

    @injectable()
    export class LexiconRoute {

        public async getDefinitions(req: Request, res: Response, next: NextFunction): Promise<void> {
            const word = req.params.word;
            const defs = await Lexicon.getDefinitions(word);
            res.send(defs);
        }

        public getCommonWithPattern(req: Request, res: Response, next: NextFunction): void {
            const lexicon: Lexicon = new Lexicon();
            const pattern = (req.params.pattern as string);
            const words: string[] = lexicon.getWordsFromPattern(pattern, false);
            res.send(words);            
        }

        public getUncommonWithPattern(req: Request, res: Response, next: NextFunction): void {
            const lexicon: Lexicon = new Lexicon();
            const pattern = req.params.pattern;
            const words: string[] = lexicon.getWordsFromPattern(pattern, true);
            res.send(words);           
        }
    }
}

export = Route;