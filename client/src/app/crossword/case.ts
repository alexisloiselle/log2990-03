export class Case {
    private letter: string;
    private isPlaced: boolean;
    private isFoundByOpponent: boolean;

    public constructor() {
        this.letter = "";
        this.isFoundByOpponent = false;
    }

    public get Letter(): string {
        return this.letter;
    }

    public set Letter(value: string) {
        this.letter = value;
    }

    public get IsPlaced(): boolean {
        return this.isPlaced;
    }

    public set IsPlaced(value: boolean) {
        this.isPlaced = value;
    }

    public get IsFoundByOpponent(): boolean {
        return this.isFoundByOpponent;
    }

    public set IsFoundByOpponent(value: boolean) {
        this.isFoundByOpponent = value;
    }
}
