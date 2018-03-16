import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { GridGenerator } from "../Crossword/grid-generator";
import { Grid } from "../Crossword/grid";
import { Case } from "../Crossword/case";
import { Word, Direction } from "../Crossword/word";
import { ICrosswordGame, ICrosswordGameInfo, IWord } from "./crossword-game";
import { MongoClient, MongoError, Db } from "mongodb";
import { MOCK_LETTERS, MOCK_WORDS_AND_DEFS } from "../../../common/mock-constants";

module Route {
    const MONGO_URL: string = "mongodb://admin:password@ds233218.mlab.com:33218/log2990-03-db";

    @injectable()
    export class CrosswordRoute {

        private grid: Grid;

        private createLetters(grid: Grid): string[][] {
            return grid.Cases.map((line: Case[]) => {
                return line.map((position: Case) => {
                    return position.RightLetter;
                });
            });
        }

        public async getGrid(req: Request, res: Response, next: NextFunction): Promise<void> {
            const DIMENSION: number = 10;
            this.grid = await GridGenerator.generateGrid(DIMENSION, DIMENSION, req.params.difficulty);
            const letters: string[][] = this.createLetters(this.grid);

            const wordsAndDefs: {
                word: string,
                definition: string,
                isHorizontal: boolean,
                position: { x: number, y: number }
            }[] = this.grid.Words.map((wordInfo: Word) => {
                return {
                    word: wordInfo.Word,
                    definition: wordInfo.Definition,
                    isHorizontal: wordInfo.Orientation === Direction.Horizontal,
                    position: { x: wordInfo.Line, y: wordInfo.Column }
                };
            });

            res.send({ letters, words: wordsAndDefs });
        }

        public async createNewGame(req: Request, res: Response, next: NextFunction): Promise<void> {
            const DIMENSION: number = 10;
            const grid: Grid = await GridGenerator.generateGrid(DIMENSION, DIMENSION, req.params.difficulty);

            const gameInfo: ICrosswordGameInfo = req.body;
            const letters: string[][] = this.createLetters(grid);
            const wordsAndDefinitions: IWord[] = grid.Words.map((wordInfo: Word) => {
                return {
                    word: wordInfo.Word,
                    definition: wordInfo.Definition,
                    isHorizontal: wordInfo.Orientation === Direction.Horizontal,
                    position: { x: wordInfo.Line, y: wordInfo.Column }
                };
            });

            const game: ICrosswordGame = { gameInfo: gameInfo, letters: letters, words: wordsAndDefinitions };

            require("mongodb").MongoClient.connect(MONGO_URL, async (err: MongoError, db: MongoClient) => {
                const collection: Db = db.client("log2990-03-db");
                collection.collection("games").insertOne(game, (insertErr: MongoError) => {
                    const isOk: boolean = (insertErr === null);
                    res.send(JSON.stringify(isOk));
                });
                await db.close();
            });
        }

        public async isWordAlreadyUsed(req: Request, res: Response, next: NextFunction): Promise<void> {
            require("mongodb").MongoClient.connect(MONGO_URL, async (err: MongoError, db: MongoClient) => {
                const collection: Db = db.client("log2990-03-db");
                collection.collection("games").find({ "gameInfo.gameName": req.params.gameName }).count().then((size: number) => {
                    const isAlreadyUsed: boolean = (size !== 0);
                    res.send(JSON.stringify(isAlreadyUsed));
                });
                await db.close();
            });
        }

        public async getMockGrid(req: Request, res: Response, next: NextFunction): Promise<void> {
            res.send({ letters: MOCK_LETTERS, words: MOCK_WORDS_AND_DEFS });
        }
    }
}

export = Route;
