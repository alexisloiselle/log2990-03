export class Case {
    private letter: string;
    private isPlaced: boolean

    public constructor() {
        this.letter = "";
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
}
