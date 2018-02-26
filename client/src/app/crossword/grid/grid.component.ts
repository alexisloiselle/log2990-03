import { Component, OnInit, ViewChildren } from '@angular/core';
import { CrosswordService } from '../services/crossword/crossword.service';
import { InputService } from '../services/crossword/inputService';
import { DefinitionService } from '../services/crossword/definitionService';
import { Word } from '../word';
import { Case } from '../case';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
    @ViewChildren("case") public cases: any;

    public letterGrid: Case[][];

    constructor(
        private crosswordService: CrosswordService,
        private inputService: InputService,
        private defService: DefinitionService
    ) {
        this.listenSelectedWord();
        this.listenLetterInput();
        this.listenBackspaceInput();
        this.listenArrowInput();
        this.listenEnterInput();
    }

    ngOnInit() {
        this.letterGrid = this.initLetterGrid(this.crosswordService.FGrid.letters.length);
        console.log(this.letterGrid);
    }

    private initLetterGrid(length: number): Case[][] {
        return Array.apply(null, Array(length)).map(() => {
            return Array.apply(null, Array(length)).map(() => {
                return new Case();
            })
        })
    }

    // used in html
    private isCaseOfSelectedWord(i: number, j: number): boolean {
        if (this.defService.SelectedWord === undefined) {
            return false;
        }

        return Word.isPartOfWord(this.defService.SelectedWord, i, j);
    }

    // used in html
    private selectWordFromCase(i: number, j: number): void {
        for (const word of this.defService.HorizontalWords) {
            if (Word.isPartOfWord(word, i, j)) {
                this.defService.handleClickDef(word);
                return;
            }
        }

        for (const word of this.defService.VerticalWords) {
            if (Word.isPartOfWord(word, i, j)) {
                this.defService.handleClickDef(word);
                return;
            }
        }
    }

    private listenSelectedWord(): void {
        this.defService.SelectWordSub.subscribe((res) => {
            this.focusOnWord(res.word);
        });
    }

    private listenLetterInput(): void {
        this.inputService.LetterInputSub.subscribe((res) => {
            this.addLetter(res.letter, res.i, res.j);
            this.focusOnNextCase(res.i, res.j);
        });
    }

    private listenBackspaceInput(): void {
        this.inputService.BackspaceInputSub.subscribe((res) => {
            this.removeLetter(res.i, res.j);
            this.focusOnPreviousCase(res.i, res.j);
        });
    }

    private listenArrowInput(): void {
        this.inputService.ArrowInputSub.subscribe((res) => {
            this.focusOnArrowCase(res.keyCode, res.i, res.j);
        });
    }

    private listenEnterInput(): void {
        this.inputService.EnterInputSub.subscribe((res) => {
            if (this.isValidWord()) {
                this.placeWord();
            }
        });
    }

    private addLetter(letter: string, i: number, j: number): void {
        if (!this.letterGrid[i][j].IsPlaced) {
            this.letterGrid[i][j].Letter = letter;
        }

        if (Word.isEndOfWord(this.defService.SelectedWord, i, j) && this.isValidWord()) {
            this.placeWord();
        }
    }

    private removeLetter(i: number, j: number): void {
        if (!this.letterGrid[i][j].IsPlaced) {
            this.letterGrid[i][j].Letter = "";
        }
    }

    private isValidWord(): boolean {
        let i: number = this.defService.SelectedWord.Line;
        let j: number = this.defService.SelectedWord.Column;
        for (const letter of this.defService.SelectedWord.Word.split("")) {
            if (letter.toUpperCase() !== this.letterGrid[i][j].Letter) {
                return false;
            }
            i = this.defService.SelectedWord.IsHorizontal ? i : i + 1;
            j = this.defService.SelectedWord.IsHorizontal ? j + 1 : j;
        }
        return true;
    }

    private placeWord(): void {
        let i: number = this.defService.SelectedWord.Line;
        let j: number = this.defService.SelectedWord.Column;
        for (let cpt = 0; cpt < this.defService.SelectedWord.Word.length; cpt++) {
            this.letterGrid[i][j].IsPlaced = true;
            i = this.defService.SelectedWord.IsHorizontal ? i : i + 1;
            j = this.defService.SelectedWord.IsHorizontal ? j + 1 : j;
        }
        this.defService.SelectedWord.IsPlaced = true;
    }

    private focusOnWord(word: Word): void {
        this.focusOnCase(word.Line, word.Column);
    }

    private focusOnNextCase(i: number, j: number): void {
        if (!Word.isEndOfWord(this.defService.SelectedWord, i, j)) {
            if (this.defService.SelectedWord.IsHorizontal) {
                this.focusOnCase(i, j + 1);
            } else {
                this.focusOnCase(i + 1, j);
            }
        }
    }

    private focusOnPreviousCase(i: number, j: number): void {
        if (!Word.isBeginningOfWord(this.defService.SelectedWord, i, j)) {
            if (this.defService.SelectedWord.IsHorizontal) {
                this.focusOnCase(i, j - 1);
            } else {
                this.focusOnCase(i - 1, j);
            }
        }
    }

    private focusOnArrowCase(keyCode: number, i: number, j: number): void {
        switch (keyCode) {
            case 37: // left
            case 38: // up
                this.focusOnPreviousCase(i, j);
                break;
            case 39: // right
            case 40: // down
                this.focusOnNextCase(i, j);
                break;
        }
    }

    private focusOnCase(i: number, j: number): void {
        const caseFound: any = this.cases.toArray().find((c: any) => {
            return c.nativeElement.getAttribute("id") === `${i}${j}`;
        });
        if (caseFound !== undefined) {
            caseFound.nativeElement.focus();
            caseFound.nativeElement.select();
        }
    }
}
