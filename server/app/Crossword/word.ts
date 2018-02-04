export class Word {
    private line: number;
    private column: number;
    private length: number;
    private orientation: string;

    constructor (line: number, column: number, length: number, orientation: string) {
        this.line = line;
        this.column = column;
        this.length = length;
        this.orientation = orientation;
    }

    public getLength(): number {
        return this.length;
    }
}
