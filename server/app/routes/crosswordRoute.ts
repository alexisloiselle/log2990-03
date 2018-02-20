import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { GridGenerator } from "../Crossword/grid-generator";
import { Grid } from "../Crossword/grid";
import { Case } from "../Crossword/case";
import { Word, Direction } from "../Crossword/word";

module Route {

    @injectable()
    export class CrosswordRoute {

        private grid: Grid;

        public async getGrid(req: Request, res: Response, next: NextFunction): Promise<void> {
            const DIMENSION: number = 10;
            console.log("ajshfkjahfkjashkjhakjshfkjahsfkjfksjvkjbsdsvbs");
            console.log(this);
            this.grid = await GridGenerator.generateGrid(DIMENSION, DIMENSION, req.params.difficulty);

            const letters: string[][] = this.grid.Cases.map((line: Case[]) => {
                return line.map((position: Case) => {
                    return position.RightLetter;
                });
            });

            const wordsAndDefs: {
                word: string,
                def: string,
                isHorizontal: boolean,
                position: {x: number, y: number}
            }[] = this.grid.Words.map((wordInfo: Word) => {
                return {
                    word: wordInfo.Word,
                    def: wordInfo.Definition,
                    isHorizontal: wordInfo.Orientation === Direction.Horizontal,
                    position: {x: wordInfo.Line, y: wordInfo.Column}
                };
            });

            res.send({letters, words: wordsAndDefs});
        }
    }
}

export = Route;
