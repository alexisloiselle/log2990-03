import * as express from "express";
import { Case } from "./case";
import { GridGenerator } from "./grid-generator";

const crosswordManager: express.Router = express.Router();

let grid: Case[][];
//let difficulty: String;

crosswordManager.get("generate-grid/:difficulty",
    // tslint:disable-next-line:align
    async function (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {

        //difficulty = req.params.difficulty;
        const DIMENSIONS: number = 10;
        grid = await GridGenerator.generateGrid(DIMENSIONS, DIMENSIONS, true);
        res.send(grid);
    });

module.exports = crosswordManager;
