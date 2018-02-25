export class Word {
    private word: string;
    private def: string;
    private isHorizontal: boolean;
    private line: number;
    private column: number;
    private isPlaced: boolean;

    public constructor (wordname: string, def: string, isHorizontal: boolean, line: number, column: number) {
        this.word = wordname;
        this.def = def;
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

    public get Def(): string {
        return this.def;
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
    
    public set IsPlaced(value : boolean) {
        this.isPlaced = value;
    }

    public static isEndOfWord(word: Word, i: number, j: number): boolean {
        console.log('refaire la fonction plz');
        if(word !== undefined) {
            if(word.IsHorizontal) {
                console.log(`end of word : ${j === word.Column + word.Word.length - 1}`);
                return j === word.Column + word.Word.length - 1;
            } else {
                console.log(`end of word : ${i === word.Line + word.Word.length -1}`);
                return i === word.Line + word.Word.length -1;
            }
        }

        return true;
    }

    public static isBeginningOfWord(word: Word, i: number, j: number): boolean {
        console.log('refaire la fonction plz');
        if(word !== undefined) {
            if(word.IsHorizontal) {
                return j === word.Column;
            } else {
                return i === word.Line;
            }
        }

        return true;
    }

    public static isPartOfWord(word: Word, i: number, j: number): boolean {
        if (word !== undefined) {
            if (word.IsHorizontal) {
                return i === word.Line &&
                    j >= word.Column &&
                    j < word.Column + word.Word.length;
            } else {
                return j === word.Column &&
                    i >= word.Line &&
                    i < word.Line + word.Word.length;
            }
        }

        return false;
    }
}
