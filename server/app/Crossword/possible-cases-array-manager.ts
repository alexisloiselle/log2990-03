import { AbstractArrayManager } from "./abstract-array-manager";

export class PossibleCasesArrayManager extends AbstractArrayManager {

    private possibleCase: [number, number][];
    
    constructor(numberOfLines: number, numberOfRows: number){
        super();
        this.possibleCase = [];
        for (let i: number = 0; i < numberOfLines; i++) {
            for (let j: number = 0; j < numberOfRows; j++) {
                this.possibleCase.push([i, j]);
            }
        }
    }

    public isArrayEmpty(): boolean {
        return this.possibleCase.length == 0;
    }

    public findRandomCase(): [number, number] {
        return this.possibleCase[Math.floor(Math.random() * (this.possibleCase.length - 1))];
    }

    public findCaseByPosition(position: [number, number]): number {
        for (let i: number = 0; i < this.possibleCase.length; i++) {
            if (this.possibleCase[i] == position) {
                return i;
            }
        }
        return -1;
    }

    public removeFromArray(index: number): void {
        this.possibleCase[index] = this.possibleCase[this.possibleCase.length - 1];
        this.possibleCase.pop();
    }
}