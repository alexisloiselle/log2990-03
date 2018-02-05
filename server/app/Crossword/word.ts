export class Word {
    private line: number;
    private column: number;
    private length: number;
    private isHorizontal: boolean;

    constructor (line: number, column: number, length: number, isHorizontal: boolean) {
        this.line = line;
        this.column = column;
        this.length = length;
        this.isHorizontal = isHorizontal;
    }
    
    public getLine() : number {
        return this.line;
    }
    
    public getColumn() : number {
        return this.column;
    }

    public getLength(): number {
        return this.length;
    }
    
    public getIsHorizontal() : boolean {
        return this.isHorizontal;
    }
}
