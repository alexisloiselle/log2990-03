import { IFormattedGrid } from "./formatted-grid";
import { Word } from "./word";

export class DefinitionsSorter {

    private horizontalDefinitions: Word[];
    private verticalDefinitions: Word[];

    public constructor(fGrid: IFormattedGrid) {
        this.horizontalDefinitions = [];
        this.verticalDefinitions = [];
        this.separateVerticalFromHorizontal(fGrid);
        this.horizontalDefinitions.sort((a: Word, b: Word) => a.Column - b.Column);
        this.horizontalDefinitions.sort((a: Word, b: Word) => a.Line - b.Line);
        this.verticalDefinitions.sort((a: Word, b: Word) => a.Line - b.Line);
        this.verticalDefinitions.sort((a: Word, b: Word) => a.Column - b.Column);
    }

    private separateVerticalFromHorizontal(fGrid: IFormattedGrid): void {
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
