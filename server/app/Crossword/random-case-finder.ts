import { Randomizer } from "./randomizer";

export class RandomCaseFinder {

    private unusedCases: [number, number][];

    constructor(numberOfLines: number, numberOfRows: number) {
        this.unusedCases = [];
        for (let i: number = 0; i < numberOfLines; i++) {
            for (let j: number = 0; j < numberOfRows; j++) {
                const temp: [number, number] = [i, j];
                this.unusedCases.push(temp);
            }
        }
    }

    public isUnusedCasesEmpty(): boolean {
        return this.unusedCases.length === 0;
    }

    private findCaseByPosition(position: [number, number]): number {
        for (let i: number = 0; i < this.unusedCases.length; i++) {
            if (this.unusedCases[i][0] === position[0] && this.unusedCases[i][1] === position[1] ) {
                return i;
            }
        }

        return -1;
    }

    private removeFromArray(index: number): void {
        this.unusedCases[index] = this.unusedCases[this.unusedCases.length - 1];
        this.unusedCases.pop();
    }

    public findRandomCase(): [number, number] {
        const randomizer: Randomizer = new Randomizer();
        const position: [number, number] = this.unusedCases[randomizer.generateRandomNumber(0, this.unusedCases.length - 1)];
        this.removeFromArray(this.findCaseByPosition(position));

        return position;
    }
}
