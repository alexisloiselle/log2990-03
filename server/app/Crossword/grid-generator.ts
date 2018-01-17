import { Case } from './case';

export class GridCreator {

    private grid : Case[][];

    constructor() { 

    }

    public gridInit(length : number, width : number) {
        var cases: Case[][];
        cases = [];
        for (var i : number = 0; i < length; i++){
            cases[i] = [];
            for (var j : number = 0; j < width; j++){
                cases[i][j] = new Case();
            }
        }
    }

    public getGrid() : Case[][] {
        return this.grid;
    }

    //TODO : create negative exception
}