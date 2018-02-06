export enum Direction { Horizontal, Vertical }

export class Word {
    private line: number;
    private column: number;
    private length: number;
    private orientation: Direction;

    constructor (line: number, column: number, length: number, orientation: Direction) {
        this.line = line;
        this.column = column;
        this.length = length;
        this.orientation = orientation;
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
}
