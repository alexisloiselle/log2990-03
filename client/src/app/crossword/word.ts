export class Word {
    private word: string;
    private def: string;
    private isHorizontal: boolean;
    private line: number;
    private column: number;

    public constructor (wordname: string, def: string, isHorizontal: boolean, line: number, column: number) {
        this.word = wordname;
        this.def = def;
        this.isHorizontal = isHorizontal;
        this.line = line;
        this.column = column;
    }

    get Line(): number {
        return this.line;
    }

    get Column(): number {
        return this.column;
    }

    get Def(): string {
        return this.def;
    }

    get Word(): string {
        return this.word;
    }

    get IsHorizontal(): boolean {
        return this.isHorizontal;
    }

    public static isEndOfWord(word: Word, i: number, j: number): boolean {
        if(word.IsHorizontal) {
            return j === word.Column + word.Word.length - 1;
        } else {
            return i === word.Line + word.Word.length -1;
        }
    }

    public static isBeginningOfWord(word: Word, i: number, j: number): boolean {
        if(word.IsHorizontal) {
            return j === word.Column;
        } else {
            return i === word.Line;
        }
    }
}
