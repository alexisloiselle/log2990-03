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
        throw new Error("Couldn't not find the case");
    }

    private removeFromArray(index: number): void {
        this.unusedCases[index] = this.unusedCases[this.unusedCases.length - 1];
        this.unusedCases.pop();
    }

    public findRandomCase(): [number, number] {
        const position: [number, number] = this.unusedCases[Math.floor(Math.random() * (this.unusedCases.length - 1))];
        let caseIndex: number;
        try {
            caseIndex = this.findCaseByPosition(position);
        } catch (e) {
            console.error("Error: ", e);
        }
        if (this.unusedCases.length === 0) {
            throw new Error("No more unused case available");
        }
        this.removeFromArray(caseIndex);

        return position;
    }
}
