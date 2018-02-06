export class RandomIndexGenerator {

    private indexes: number[];

    constructor(minimum: number, maximum: number) {
        this.indexes = [];
        for (let i: number = minimum; i <= maximum; i++) {
            this.indexes.push(i);
        }
    }

    public getArray(): number[] {
        return this.indexes;
    }

    private removeIndexFromList(index: number): void {
        this.indexes[index] = this.indexes[this.indexes.length - 1];
        this.indexes.pop();
    }

    public generateRandomIndex(): number {
        const randomNumber: number = Math.floor(Math.random() * this.indexes.length);
        const randomIndex: number = this.indexes[randomNumber];
        if (this.indexes.length === 0) {
            throw new Error("Array is empty");
        }
        this.removeIndexFromList(randomNumber);

        return randomIndex;
    }
}
