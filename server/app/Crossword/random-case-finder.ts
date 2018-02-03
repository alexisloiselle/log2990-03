export class RandomCaseFinder {

    private possibleCase: [number, number][];

    constructor(numberOfLines: number, numberOfRows: number) {
        this.possibleCase = [];
        for (let i: number = 0; i < numberOfLines; i++) {
            for (let j: number = 0; j < numberOfRows; j++) {
                const temp: [number, number] = [i, j];
                this.possibleCase.push(temp);
            }
        }
    }

    public isArrayEmpty(): boolean {
        return this.possibleCase.length === 0;
    }

    public findCaseByPosition(position: [number, number]): number {
        for (let i: number = 0; i < this.possibleCase.length; i++) {
            if (this.possibleCase[i][0] === position[0] && this.possibleCase[i][1] === position[1] ) {
                return i;
            }
        }

        return -1;
    }

    public removeFromArray(index: number): void {
        this.possibleCase[index] = this.possibleCase[this.possibleCase.length - 1];
        this.possibleCase.pop();
    }

    public findRandomCase(): [number, number] {
        const position: [number, number] = this.possibleCase[Math.floor(Math.random() * (this.possibleCase.length - 1))];
        this.removeFromArray(this.findCaseByPosition(position));

        return position;
    }
}
