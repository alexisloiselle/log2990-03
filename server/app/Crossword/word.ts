export enum Direction { Horizontal, Vertical }

export class Word {
    private line: number;
    private column: number;
    private length: number;
    private orientation: Direction;
    private nbConstraints: number;
    private word: string;
    private definition: string;

    constructor(line: number, column: number, length: number, orientation: Direction, word: string) {
        this.line = line;
        this.column = column;
        this.length = length;
        this.orientation = orientation;
        this.nbConstraints = 0;
        this.word = word;
        this.definition = "";
    }

    public get Line(): number {
        return this.line;
    }

    public get Column(): number {
        return this.column;
    }

    public get Length(): number {
        return this.length;
    }

    public get Orientation(): Direction {
        return this.orientation;
    }

    public get NbConstraints(): number {
        return this.nbConstraints;
    }

    public set NbConstraints(value: number) {
        this.nbConstraints = value;
    }

    public get Word(): string {
        return this.word;
    }

    public set Word(value: string) {
        this.word = value;
    }

    public get Definition(): string {
        return this.definition;
    }

    public set Definition(value: string) {
        this.definition = value;
    }
}
