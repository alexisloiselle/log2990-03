export class Word {
    private word: string;
    private definition: string;
    private isHorizontal: boolean;
    private line: number;
    private column: number;
    private isPlaced: boolean;

    public constructor(wordname: string, definition: string, isHorizontal: boolean, line: number, column: number) {
        this.word = wordname;
        this.definition = definition;
        this.isHorizontal = isHorizontal;
        this.line = line;
        this.column = column;
        this.isPlaced = false;
    }

    public get Line(): number {
        return this.line;
    }

    public get Column(): number {
        return this.column;
    }

    public get Definition(): string {
        return this.definition;
    }

    public get Word(): string {
        return this.word;
    }

    public get IsHorizontal(): boolean {
        return this.isHorizontal;
    }

    public get IsPlaced(): boolean {
        return this.isPlaced;
    }

    public set IsPlaced(value: boolean) {
        this.isPlaced = value;
    }

    public static isEndOfWord(word: Word, i: number, j: number): boolean {
        if (word !== undefined) {
            return word.IsHorizontal ?
                j === word.Column + word.Word.length - 1 :
                i === word.Line + word.Word.length - 1;
        }

        return true;
    }

    public static isBeginningOfWord(word: Word, i: number, j: number): boolean {
        if (word !== undefined) {
            return word.IsHorizontal ?
                j === word.Column :
                i === word.Line;
        }

        return true;
    }

    public static isPartOfWord(word: Word, i: number, j: number): boolean {
        if (word !== undefined) {
            return word.IsHorizontal ?
                i === word.Line && j >= word.Column && j < word.Column + word.Word.length :
                j === word.Column && i >= word.Line && i < word.Line + word.Word.length;
        }

        return false;
    }
}
