import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { GridGenerator } from "../Crossword/grid-generator";
import { Grid } from "../Crossword/grid";
import { Case } from "../Crossword/case";
import { Word, Direction } from "../Crossword/word";
import { ICrosswordGame, ICrosswordGameInfo, IWord } from "./crossword-game";
import { IMultiplayerGame } from "../../../common/multiplayer-game";
import { MongoClient, MongoError, Db, Cursor } from "mongodb";
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

        private mockCases(): Case[][] {
            const mockCases: Case[][] = [];
            for (let i: number = 0; i < MOCK_LETTERS.length; i++) {
                mockCases[i] = [];
                for (let j: number = 0; j < MOCK_LETTERS[0].length; j++) {
                    const tempCase: Case = new Case;
                    tempCase.RightLetter = MOCK_LETTERS[i][j];
                    mockCases[i][j] = tempCase;
                }
            }

            return mockCases;
        }

        public async createNewGame(req: Request, res: Response, next: NextFunction): Promise<void> {
            // const DIMENSION: number = 10;
            // const grid: Grid = await GridGenerator.generateGrid(DIMENSION, DIMENSION, req.params.difficulty);

            const mockCases: Case[][] = this.mockCases();
            const grid: Grid = new Grid(mockCases, MOCK_WORDS_AND_DEFS);

            const gameInfo: ICrosswordGameInfo = req.body;
            const letters: string[][] = this.createLetters(grid);
            const wordsAndDefinitions: IWord[] = MOCK_WORDS_AND_DEFS;

            const game: ICrosswordGame = { gameInfo: gameInfo, letters: letters, words: wordsAndDefinitions };

            require("mongodb").MongoClient.connect(MONGO_URL, async (err: MongoError, db: MongoClient) => {
                const collection: Db = db.db("log2990-03-db");
                collection.collection("games").insertOne(game, (insertErr: MongoError) => {
                    const isOk: boolean = (insertErr === null);
                    res.send(JSON.stringify(isOk));
                });
                await db.close();
            });
        }

        public async isWordAlreadyUsed(req: Request, res: Response, next: NextFunction): Promise<void> {
            require("mongodb").MongoClient.connect(MONGO_URL, async (err: MongoError, db: MongoClient) => {
                const collection: Db = db.db("log2990-03-db");
                collection.collection("games").find({ "gameInfo.gameName": req.params.gameName }).count().then((size: number) => {
                    const isAlreadyUsed: boolean = (size !== 0);
                    res.send(JSON.stringify(isAlreadyUsed));
                });
                await db.close();
            });
        }

        public async getGames(red: Request, res: Response, next: NextFunction): Promise<void> {
            const games: IMultiplayerGame[] = [];
            await require("mongodb").MongoClient.connect(MONGO_URL, async(err: MongoError, db: MongoClient) => {
                const collection: Db = db.db("log2990-03-db");
                const gamesCursor: Cursor<ICrosswordGame> = await collection.collection("games").find({"gameInfo.userName2": ""});
                for (let game: ICrosswordGame = await gamesCursor.next(); game != null; game = await gamesCursor.next()) {
                    games.push({ userName1: game.gameInfo.userName1, userName2: game.gameInfo.userName2,
                                 gameName: game.gameInfo.gameName, difficulty: game.gameInfo.difficulty });
                }
                await db.close();
                res.send(games);
            });
        }

        public async getMultiplayerGrid(req: Request, res: Response, next: NextFunction): Promise<void> {
            await require("mongodb").MongoClient.connect(MONGO_URL, async(err: MongoError, db: MongoClient) => {
                const collection: Db = db.db("log2990-03-db");
                const currentGame: ICrosswordGame = await collection.collection("games")
                .findOne({"gameInfo.gameName": req.params.gameName});
                const letters: string[][] = currentGame.letters;
                const wordsAndDefs: {
                    word: string,
                    definition: string,
                    isHorizontal: boolean,
                    position: { x: number, y: number }
                }[] = currentGame.words;

                await db.close();
                res.send({ letters, words: wordsAndDefs });
            });
        }

        public async updateMultiplayerGame(req: Request, res: Response, next: NextFunction): Promise<void> {
            const gameInfo: ICrosswordGameInfo = req.body;
            require("mongodb").MongoClient.connect(MONGO_URL, (err: MongoError, db: MongoClient) => {
                const collection: Db = db.db("log2990-03-db");
                collection.collection("games").updateOne(
                    { "gameInfo.gameName": (gameInfo.gameName) },
                    { $set: { "gameInfo.userName2": gameInfo.userName2 } }, (updateErr: MongoError) => {
                        const isOk: boolean = updateErr === null;
                        res.send(JSON.stringify(isOk));
                    });
                db.close();
            });
        }

        public async getMockGrid(req: Request, res: Response, next: NextFunction): Promise<void> {
            res.send({ letters: MOCK_LETTERS, words: MOCK_WORDS_AND_DEFS });
        }
    }
}

export = Route;
