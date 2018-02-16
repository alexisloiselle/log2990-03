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

    get Line(): number {
        return this.line;
    }

    get Column(): number {
        return this.column;
    }

    get Length(): number {
        return this.length;
    }

    get Orientation(): Direction {
        return this.orientation;
    }

    get NbConstraints(): number {
        return this.nbConstraints;
    }

    set NbConstraints(value: number) {
        this.nbConstraints = value;
    }

    get Word(): string {
        return this.word;
    }

    set Word(value: string) {
        this.word = value;
    }

    get Definition(): string {
        return this.definition;
    }

    set Definition(value: string) {
        this.definition = value;
    }
}
