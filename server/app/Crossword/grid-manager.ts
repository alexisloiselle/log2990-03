import { Case } from './case';

export class GridManager {

    private grid : Case[][];

    constructor() { 

    }

    public getCases(){
        return this.grid;
    }

    public generateGrid(length : number, width : number) {
        //TODO : create negative exception for generate grid
        this.grid = [];
        for (let i : number = 0; i < length; i++){
            this.grid[i] = [];
            for (let j : number = 0; j < width; j++){
                this.grid[i][j] = new Case();
            }
        }
        return this.grid
    }

    public randomGreyCaseGenerator(percentage : number){
        //let maxNumberOfCase : number = Math.floor();
    }

}