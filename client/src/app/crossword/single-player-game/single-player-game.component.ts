import { Component, OnInit, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// import { Game } from "../game";
import { CrosswordService } from "./../services/crossword/crossword.service";
import { FormattedGrid } from "../formatted-grid";
import { DefintionsSorter } from "./../definitions-sorter";
import { Word } from "./../word";
import { InputService } from "../services/crossword/inputService";
import { DefinitionService } from "../services/crossword/definitionService";
import { Case } from "../case";

@Component({
    selector: "app-single-player-game",
    templateUrl: "./single-player-game.component.html",
    styleUrls: ["./single-player-game.component.css"]
})
export class SinglePlayerGameComponent implements OnInit {
    @ViewChildren("case") public cases: any;

    public difficulty: string;
    public fGrid: FormattedGrid;
    public horizontalWords: Word[];
    public verticalWords: Word[];
    public isCheatModeOn: boolean;
    public letterGrid: Case[][];
    // private game: Game;

    public constructor(
        private crosswordService: CrosswordService,
        private inputService: InputService,
        private defService: DefinitionService,
        private route: ActivatedRoute,
    ) {
        this.listenLetterInput();
        this.listenBackspaceInput();
        this.listenArrowInput();
        this.listenEnterInput();
        this.listenSelectedWord();
    }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe((params) => {
            // this.difficulty = params["difficulty"];
            this.difficulty = "mock";
        });
        this.isCheatModeOn = false;
        this.fGrid = await this.crosswordService.generateGrid(this.difficulty);
        this.letterGrid = this.initLetterGrid(this.fGrid.letters);
        // this.game = new Game(this.difficulty);
        const definitionsSorter: DefintionsSorter = new DefintionsSorter(this.fGrid);
        this.horizontalWords = definitionsSorter.HorizontalDefinitions;
        this.verticalWords = definitionsSorter.VerticalDefinitions;
    }

    private initLetterGrid(letters: string[][]): Case[][] {
        return letters.map((line) => {
            return line.map((letter) => {
                return new Case();
            });
        });
    }

    private listenLetterInput(): void {
        this.inputService.LetterInputSub.subscribe((res) => {
            if (this.defService.SelectedWord === undefined ||
                !this.isCaseOfSelectedWord(res.i, res.j)
            ) {
                return;
            }

            this.addLetter(res.letter, res.i, res.j);
            this.focusOnNextCase(res.i, res.j);
        });
    }

    private listenBackspaceInput(): void {
        this.inputService.BackspaceInputSub.subscribe((res) => {
            if (this.defService.SelectedWord === undefined ||
                !this.isCaseOfSelectedWord(res.i, res.j)
            ) {
                return;
            }

            this.removeLetter(res.i, res.j);
            this.focusOnPreviousCase(res.i, res.j);
        });
    }

    private listenArrowInput(): void {
        this.inputService.ArrowInputSub.subscribe((res) => {
            console.log('arrow listened');
            this.focusOnArrowCase(res.keyCode, res.i, res.j);
        });
    }

    private listenEnterInput(): void {
        this.inputService.EnterInputSub.subscribe((res) => {
            if(this.isValidWord()) {
                this.placeWord();
            }
        });
    }

    private listenSelectedWord(): void {
        this.defService.SelectWordSub.subscribe((res) => {
            this.focusOnWord(res.word);
        });
    }

    public set IsCheatModeOn(isCheatModeOn: boolean) {
        this.isCheatModeOn = isCheatModeOn;
    }

    private addLetter(letter: string, i: number, j: number): void {
        if(!this.letterGrid[i][j].IsPlaced) {
            this.letterGrid[i][j].Letter = letter;
        }

        if (Word.isEndOfWord(this.defService.SelectedWord, i, j) && this.isValidWord()) {
            this.placeWord();
            console.log('word placed');
        }
    }

    private removeLetter(i: number, j: number): void {
        if(this.letterGrid[i][j].IsPlaced) {
            return;
        }

        this.letterGrid[i][j].Letter = "";
    }

    private isCaseOfSelectedWord(i: number, j: number): boolean {
        if(this.defService.SelectedWord === undefined) {
            return false;
        }

        if (this.defService.SelectedWord.IsHorizontal) {
            return i === this.defService.SelectedWord.Line &&
                j >= this.defService.SelectedWord.Column &&
                j < this.defService.SelectedWord.Column + this.defService.SelectedWord.Word.length;
        } else {
            return j === this.defService.SelectedWord.Column &&
                i >= this.defService.SelectedWord.Line &&
                i < this.defService.SelectedWord.Line + this.defService.SelectedWord.Word.length;
        }
    }

    private isDefOfSelectedWord(word: Word): boolean {
        if(this.defService.SelectedWord === undefined){
            return false;
        }
        return word.Word === this.defService.SelectedWord.Word;
    }

    private selectWord(i: number, j: number): void {
        
    }

    private isValidWord(): boolean {
        let i: number = this.defService.SelectedWord.Line;
        let j: number = this.defService.SelectedWord.Column;
        for (const letter of this.defService.SelectedWord.Word.split("")) {
            console.log(`${letter} : ${letter === this.letterGrid[i][j].Letter}`);
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
        console.log(keyCode);
        switch (keyCode) {
            case 37: // left
                this.focusOnCase(i, j - 1);
                break;
            case 38: // up
                this.focusOnCase(i - 1, j);
                break;
            case 39: // right
                this.focusOnCase(i, j + 1);
                break;
            case 40: // down
                this.focusOnCase(i + 1, j);
                break;
        }
    }

    private focusOnWord(word: Word): void {
        this.focusOnCase(word.Line, word.Column);
    }

    private focusOnCase(i: number, j: number): void {
        const c: any = this.cases.toArray().find((c: any) => {
            return c.nativeElement.getAttribute("id") === `${i}${j}`;
        });
        if (c !== undefined) {
            c.nativeElement.focus();
            c.nativeElement.select();
        }
    }
}
