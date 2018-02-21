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
            console.log("entered in get crossword on server");
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
                position: { x: number, y: number }
            }[] = this.grid.Words.map((wordInfo: Word) => {
                return {
                    word: wordInfo.Word,
                    def: wordInfo.Definition,
                    isHorizontal: wordInfo.Orientation === Direction.Horizontal,
                    position: { x: wordInfo.Line, y: wordInfo.Column }
                };
            });

            res.send({ letters, words: wordsAndDefs });
        }

        // tslint:disable-next-line:max-func-body-length
        public getMockGrid(req: Request, res: Response, next: NextFunction): void {
            const letters: string[][] =
                [["", "a", "", "", "b", "a", "c", "o", "n", ""],
                 ["s", "l", "", "m", "o", "r", "a", "l", "", "a"],
                 ["p", "a", "d", "", "b", "", "g", "d", "", "c"],
                 ["a", "s", "p", "", "", "e", "e", "", "", "e"],
                 ["", "", "", "e", "", "n", "", "l", "a", "t"],
                 ["a", "f", "a", "r", "", "d", "", "", "", "i"],
                 ["c", "", "b", "a", "d", "", "a", "", "r", "c"],
                 ["e", "", "b", "", "l", "a", "b", "", "a", ""],
                 ["", "b", "e", "d", "", "", "l", "", "y", ""],
                 ["a", "n", "y", "", "", "s", "e", "a", "", ""]];

            // tslint:disable-next-line:no-any
            const wordsAndDefs: any = [
                {
                    word: "alas",
                    def: "by bad luck",
                    isHorizontal: false,
                    position: {x: 0, y: 1}
                },
                {
                    word: "bacon",
                    def: "back and sides of a hog salted and dried or smoked; usually sliced thin and fried",
                    isHorizontal: true,
                    position: {x: 0, y: 4}
                },
                {
                    word: "bob",
                    def: "a short abrupt inclination (as of the head)",
                    isHorizontal: false,
                    position: {x: 0, y: 4}
                },
                {
                    word: "cage",
                    def: "an enclosure made or wire or metal bars in which birds or animals are kept",
                    isHorizontal: false,
                    position: {x: 0, y: 6}
                },
                {
                    word: "old",
                    def: "past times (especially in the phrase `in days of old')",
                    isHorizontal: false,
                    position: {x: 0, y: 7}
                },
                {
                    word: "spa",
                    def: "a place of business with equipment and facilities for exercising and improving physical fitness",
                    isHorizontal: false,
                    position: {x: 1, y: 0}
                },
                {
                    word: "moral",
                    def: "the significance of a story or event",
                    isHorizontal: true,
                    position: {x: 1, y: 3}
                },
                {
                    word: "acetic",
                    def: "relating to or containing acetic acid",
                    isHorizontal: false,
                    position: {x: 1, y: 9}
                },
                {
                    word: "pad",
                    def: "the foot or fleshy cushion-like underside of the toes of an animal",
                    isHorizontal: true,
                    position: {x: 2, y: 0}
                },
                {
                    word: "asp",
                    def: "cobra used by the Pharaohs as a symbol of their power over life and death",
                    isHorizontal: true,
                    position: {x: 3, y: 0}
                },
                {
                    word: "end",
                    def: "a position on the line of scrimmage",
                    isHorizontal: false,
                    position: {x: 3, y: 5}
                },
                {
                    word: "era",
                    def: "a major division of geological time; an era is usually divided into two or more periods",
                    isHorizontal: false,
                    position: {x: 4, y: 3}
                },
                {
                    word: "lat",
                    def: "a broad flat muscle on either side of the back",
                    isHorizontal: true,
                    position: {x: 4, y: 7}
                },
                {
                    word: "afar",
                    def: "(old-fashioned) at or from or to a great distance; far",
                    isHorizontal: true,
                    position: {x: 5, y: 0}
                },
                {
                    word: "ace",
                    def: "a serve that the receiver is unable to reach",
                    isHorizontal: false,
                    position: {x: 5, y: 0}
                },
                {
                    word: "abbey",
                    def: "a monastery ruled by an abbot",
                    isHorizontal: false,
                    position: {x: 5, y: 2}
                },
                {
                    word: "bad",
                    def: "that which is below standard or expectations as of ethics or decency",
                    isHorizontal: true,
                    position: {x: 6, y: 2}
                },
                {
                    word: "able",
                    def: "(usually followed by `to') having the necessary means or skill or know-how or authority to do something",
                    isHorizontal: false,
                    position: {x: 6, y: 6}
                },
                {
                    word: "ray",
                    // tslint:disable-next-line:max-line-length
                    def: "cartilaginous fishes having horizontally flattened bodies and enlarged winglike pectoral fins with gills on the underside; most swim by moving the pectoral fins",
                    isHorizontal: false,
                    position: {x: 6, y: 8}
                },
                {
                    word: "lab",
                    def: "a workplace for the conduct of scientific research",
                    isHorizontal: true,
                    position: {x: 7, y: 4}
                },
                {
                    word: "bed",
                    def: "a piece of furniture that provides a place to sleep",
                    isHorizontal: true,
                    position: {x: 8, y: 1}
                },
                {
                    word: "any",
                    def: "to any degree or extent",
                    isHorizontal: true,
                    position: {x: 9, y: 0}
                },
                {
                    word: "sea",
                    def: "a division of an ocean or a large body of salt water partially enclosed by land",
                    isHorizontal: true,
                    position: {x: 9, y: 5}
                }];
            res.send({letters, words: wordsAndDefs});
        }
    }
}
}

export = Route;
