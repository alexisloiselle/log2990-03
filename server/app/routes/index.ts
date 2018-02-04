import { Request, Response, NextFunction } from "express";
import { Message } from "../../../common/communication/message";
import "reflect-metadata";
import { injectable, } from "inversify";
import { Lexicon } from "../lexicon/lexicon";

module Route {

    @injectable()
    export class Index {

        public async helloWorld(req: Request, res: Response, next: NextFunction): Promise<void> {
            const message: Message = new Message();
            message.title = "Hello";
            const def: string[] = await Lexicon.getDefinitions("world");
            message.body = def[1];
            res.send(`${message.title} ${message.body}`);
        }
    }
}

export = Route;
