export enum Direction { Horizontal, Vertical }

export class Word {
    private line: number;
    private column: number;
    private length: number;
    private orientation: Direction;
    private nbConstraints: number;
    private word: string;

    constructor(line: number, column: number, length: number, orientation: Direction, word: string) {
        this.line = line;
        this.column = column;
        this.length = length;
        this.orientation = orientation;
        this.nbConstraints = 0;
        this.word = word;
    }

    public getLine(): number {
        return this.line;
    }

    public getColumn(): number {
        return this.column;
    }

    public getLength(): number {
        return this.length;
    }

    public getOrientation(): Direction {
        return this.orientation;
    }

    public getNbConstraints(): number {
        return this.nbConstraints;
    }

    public setNbConstraints(value: number): void {
        this.nbConstraints = value;
    }

    public getWord(): string {
        return this.word;
    }

    public setWord(value: string): void {
        this.word = value;
    }
}
