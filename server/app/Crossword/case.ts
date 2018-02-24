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

    public get IsBlack(): boolean {
        return this.isBlack;
    }

    public set IsBlack(value: boolean) {
        this.isBlack = value;
    }

    public get HorizontalWordLength(): number {
        return this.horizontalWordLength;
    }

    public set HorizontalWordLength(value: number) {
        this.horizontalWordLength = value;
    }

    public get HorizontalPositionInWord(): number {
        return this.horizontalPositionInWord;
    }

    public set HorizontalPositionInWord(value: number) {
        this.horizontalPositionInWord = value;
    }

    public get VerticalWordLength(): number {
        return this.verticalWordLength;
    }

    public set VerticalWordLength(value: number) {
        this.verticalWordLength = value;
    }

    public get VerticalPositionInWord(): number {
        return this.verticalPositionInWord;
    }

    public set VerticalPositionInWord(value: number) {
        this.verticalPositionInWord = value;
    }

    public get RightLetter(): string {
        return this.rightLetter;
    }

    public set RightLetter(value: string) {
        this.rightLetter = value;
    }

    public get IsAConstraint(): boolean {
        return this.isAConstraint;
    }

    public set IsAConstraint(value: boolean) {
        this.isAConstraint = value;
    }
}
