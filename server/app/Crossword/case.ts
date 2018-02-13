export class Case {
    private isBlack: boolean;

    private horizontalWordLength: number;
    private horizontalPositionInWord: number;

    private verticalWordLength: number;
    private verticalPositionInWord: number;

    private rightLetter: string;

    private isAConstraint: boolean;

    constructor() {
        this.isBlack = false;
        this.isAConstraint = false;
        this.rightLetter = "";
    }

    get IsBlack(): boolean {
        return this.isBlack;
    }

    set IsBlack(value: boolean) {
        this.isBlack = value;
    }

    get HorizontalWordLength(): number {
        return this.horizontalWordLength;
    }

    set HorizontalWordLength(value: number) {
        this.horizontalWordLength = value;
    }

    get HorizontalPositionInWord(): number {
        return this.horizontalPositionInWord;
    }

    set HorizontalPositionInWord(value: number) {
        this.horizontalPositionInWord = value;
    }

    get VerticalWordLength(): number {
        return this.verticalWordLength;
    }

    set VerticalWordLength(value: number) {
        this.verticalWordLength = value;
    }

    get VerticalPositionInWord(): number {
        return this.verticalPositionInWord;
    }

    set VerticalPositionInWord(value: number) {
        this.verticalPositionInWord = value;
    }

    get RightLetter(): string {
        return this.rightLetter;
    }

    set RightLetter(value: string) {
        this.rightLetter = value;
    }

    get IsAConstraint(): boolean {
        return this.isAConstraint;
    }

    set IsAConstraint(value: boolean) {
        this.isAConstraint = value;
    }
}
