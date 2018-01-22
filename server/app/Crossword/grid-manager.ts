import { Case } from './case';

export class GridManager {

    constructor() { 

    }

    public generateGrid(length : number, width : number) {
        var cases: Case[][];
        cases = [];
        for (var i : number = 0; i < length; i++){
            cases[i] = [];
            for (var j : number = 0; j < width; j++){
                cases[i][j] = new Case();
            }
        }
        return cases
    }

    //TODO : create negative exception
}