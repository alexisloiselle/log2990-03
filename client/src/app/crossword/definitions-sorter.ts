import { IFormattedGrid } from "./formatted-grid";
import { Word } from "./word";

export class DefinitionsSorter {

    private horizontalDefinitions: Word[];
    private verticalDefinitions: Word[];

    public constructor(formattedGrid: IFormattedGrid) {
        this.horizontalDefinitions = [];
        this.verticalDefinitions = [];
        this.separateVerticalFromHorizontal(formattedGrid);
        this.horizontalDefinitions.sort((a: Word, b: Word) => a.Column - b.Column);
        this.horizontalDefinitions.sort((a: Word, b: Word) => a.Line - b.Line);
        this.verticalDefinitions.sort((a: Word, b: Word) => a.Line - b.Line);
        this.verticalDefinitions.sort((a: Word, b: Word) => a.Column - b.Column);
    }

    private separateVerticalFromHorizontal(formattedGrid: IFormattedGrid): void {
        for (const word of formattedGrid.words) {
            const currentWord: Word = new Word(
                word.word,
                word.definition,
                word.isHorizontal,
                word.position.x,
                word.position.y
            );

            word.isHorizontal ?
                this.horizontalDefinitions.push(currentWord) :
                this.verticalDefinitions.push(currentWord);
        }
    }

    public get HorizontalDefinitions(): Word[] {
        return this.horizontalDefinitions;
    }

    public get VerticalDefinitions(): Word[] {
        return this.verticalDefinitions;
    }
}
