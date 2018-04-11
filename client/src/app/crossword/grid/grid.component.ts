import { Component, OnInit, ViewChildren, ElementRef, QueryList } from "@angular/core";
import { CrosswordService } from "../services/crossword/crossword.service";
import { InputService } from "../services/crossword/input.service";
import { DefinitionService } from "../services/crossword/definition.service";
import { Subject } from "rxjs/Subject";
import { Word } from "../word";
import { Case } from "../case";
import * as io from "socket.io-client";
import {WORD_CORRECT, SELECTED_WORD} from "../../../../../common/socket-constants";
import {SocketService} from "../services/socket.service";

const LEFT_KEYCODE: number = 37;
const UP_KEYCODE: number = 38;
const RIGHT_KEYCODE: number = 39;
const DOWN_KEYCODE: number = 40;

@Component({
    selector: "app-grid",
    templateUrl: "./grid.component.html",
    styleUrls: ["./grid.component.css"]
})
export class GridComponent implements OnInit {
    @ViewChildren("case") public cases: QueryList<ElementRef>;
    private letterGrid: Case[][];
    public socket: SocketIOClient.Socket;
    public rSocket: Subject<{socket: SocketIOClient.Socket }>;
    public numberPlacedWords: number;
    public opponentSelectedWord: Word;

    public constructor(
        private crosswordService: CrosswordService,
        private inputService: InputService,
        private defService: DefinitionService,
        private socketService: SocketService
    ) {
        this.socket = io.connect("localhost:3000");
        this.numberPlacedWords = 0;
        this.listenSelectedWord();
        this.listenLetterInput();
        this.listenOpponentSelectsWord();
        this.listenBackspaceInput();
        this.listenArrowInput();
        this.listenEnterInput();
        this.listenWordCorrect();
        this.letterGrid = this.initLetterGrid(this.crosswordService.FormattedGrid.letters.length);
    }

    public ngOnInit(): void { }

    public get LetterGrid(): Case[][] {
        return this.letterGrid;
    }

    private initLetterGrid(length: number): Case[][] {
        return Array.apply(null, Array(length)).map(() => {
            return Array.apply(null, Array(length)).map(() => {
                return new Case();
            });
        });
    }

    private listenWordCorrect(): void {
        this.socketService.wordCorrect().subscribe((data) => {

            console.log(data);
        });
    }
    private listenOpponentSelectsWord(): void {
        this.socketService.selectWord().subscribe((data) => {
            console.log(data);
        });
    }

    private listenSelectedWord(): void {
        this.defService.SelectWordSub.subscribe((res) => {
            this.socket.emit(SELECTED_WORD, this.defService.SelectedWord.Line, this.defService.SelectedWord.Column);
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

    // html can't access static function of Word
    public isPartOfWord(word: Word, i: number, j: number): boolean {
        return Word.isPartOfWord(word, i, j);
    }

    public selectWordFromCase(i: number, j: number): void {
        if (this.findWordWithCase(this.defService.HorizontalWords, i, j)) { return; }
        if (this.findWordWithCase(this.defService.VerticalWords, i, j)) { return; }
    }

    private findWordWithCase(words: Word[], i: number, j: number): boolean {
        for (const word of words) {
            if (Word.isPartOfWord(word, i, j)) {
                this.defService.handleClickDef(word);

                return true;
            }
        }

        return false;
    }

    private addLetter(letter: string, i: number, j: number): void {
        if (!this.letterGrid[i][j].IsPlaced) {
            this.letterGrid[i][j].Letter = letter;
        }

        this.verifyEndOfWord(i, j);
    }

    private verifyEndOfWord(i: number, j: number): void {
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
        this.socket.emit(WORD_CORRECT, this.defService.SelectedWord.Line, this.defService.SelectedWord.Column);

        return true;
    }

    private placeWord(): void {
        let i: number = this.defService.SelectedWord.Line;
        let j: number = this.defService.SelectedWord.Column;
        this.defService.SelectedWord.Word.split("").forEach(() => {
            this.letterGrid[i][j].IsPlaced = true;
            i = this.defService.SelectedWord.IsHorizontal ? i : i + 1;
            j = this.defService.SelectedWord.IsHorizontal ? j + 1 : j;
        });

        this.defService.SelectedWord.IsPlaced = true;
    }

    private focusOnWord(word: Word): void {
        this.focusOnCase(word.Line, word.Column);
    }

    private focusOnNextCase(i: number, j: number): void {
        if (!Word.isEndOfWord(this.defService.SelectedWord, i, j)) {
            this.defService.SelectedWord.IsHorizontal ?
                this.focusOnCase(i, j + 1) :
                this.focusOnCase(i + 1, j);
        }
    }

    private focusOnPreviousCase(i: number, j: number): void {
        if (!Word.isBeginningOfWord(this.defService.SelectedWord, i, j)) {
            this.defService.SelectedWord.IsHorizontal ?
                this.focusOnCase(i, j - 1) :
                this.focusOnCase(i - 1, j);
        }
    }

    private focusOnArrowCase(keyCode: number, i: number, j: number): void {
        switch (keyCode) {
            case LEFT_KEYCODE:
            case UP_KEYCODE:
                this.focusOnPreviousCase(i, j);
                break;
            case RIGHT_KEYCODE:
            case DOWN_KEYCODE:
                this.focusOnNextCase(i, j);
                break;
            default:
                break;
        }
    }

    private focusOnCase(i: number, j: number): void {
        const caseFound: ElementRef = this.cases.toArray().find((c: ElementRef) => {
            return c.nativeElement.getAttribute("id") === `${i}${j}`;
        });
        if (caseFound !== undefined) {
            caseFound.nativeElement.focus();
            caseFound.nativeElement.select();
        }
    }
}
