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
    }
}

export = Route;