import { FormattedGrid } from "./formatted-grid";
import { Word } from "./word";

export class DefintionsSorter {

    private horizontalDefinitions: Word[];
    private verticalDefinitions: Word[];

    public constructor(fGrid: FormattedGrid) {
        this.horizontalDefinitions = [];
        this.verticalDefinitions = [];
        this.separateVerticalFromHorizontal(fGrid);
        this.horizontalDefinitions.sort((a: Word, b: Word) => a.Column - b.Column);
        this.horizontalDefinitions.sort((a: Word, b: Word) => a.Line - b.Line);
        this.verticalDefinitions.sort((a: Word, b: Word) => a.Line - b.Line);
        this.verticalDefinitions.sort((a: Word, b: Word) => a.Column - b.Column);
    }

    private separateVerticalFromHorizontal(fGrid: FormattedGrid): void {
        for (const word of fGrid.words) {
            const currentWord: Word = new Word(word.word, word.def, word.isHorizontal, word.position.x, word.position.y);
            if (word.isHorizontal) {
                this.horizontalDefinitions.push(currentWord);
            } else {
                this.verticalDefinitions.push(currentWord);
            }
        }
    }

    public get HorizontalDefinitions(): Word[] {
        return this.horizontalDefinitions;
    }

    public get VerticalDefinitions(): Word[] {
        return this.verticalDefinitions;
    }
}
