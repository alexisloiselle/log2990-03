import { Component, OnInit, ViewChildren, ElementRef, QueryList } from "@angular/core";
import { CrosswordService } from "../services/crossword/crossword.service";
import { InputService } from "../services/crossword/input.service";
import { DefinitionService } from "../services/crossword/definition.service";
import { Subject } from "rxjs/Subject";
import { Word } from "../word";
import { Case } from "../case";
import { WORD_CORRECT, SELECTED_WORD } from "../../../../../common/socket-constants";
import { SocketService } from "../services/socket.service";
import { IWord } from "../../../../../common/IWord";

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
    public rSocket: Subject<{ socket: SocketIOClient.Socket }>;
    public numberPlacedWords: number;
    public opponentSelectedWord: Word;

    public constructor(
        private crosswordService: CrosswordService,
        private inputService: InputService,
        private defService: DefinitionService,
        private socketService: SocketService
    ) {
        this.numberPlacedWords = 0;
        this.listenSelectedWord();
        this.listenLetterInput();
        this.listenOpponentSelectsWord();
        this.listenBackspaceInput();
        this.listenArrowInput();
        this.listenEnterInput();
        this.listenWordCorrect();
        this.letterGrid = this.initLetterGrid(this.crosswordService.FormattedGrid.letters.length);
        this.letterGrid.forEach((line) => line.forEach((word) => word.IsPlaced = false));
    }

    public ngOnInit(): void { }

    public get LetterGrid(): Case[][] {
        return this.letterGrid;
    }

    public isMultiplayer(): boolean {
        return location.pathname.includes("multiplayer-game");
    }

    private initLetterGrid(length: number): Case[][] {
        return Array.apply(null, Array(length)).map(() => {
            return Array.apply(null, Array(length)).map(() => {
                return new Case();
            });
        });
    }

    private listenWordCorrect(): void {
        this.socketService.wordCorrect().subscribe((res) => {
            const word: Word = new Word(
                res.word.word,
                res.word.definition,
                res.word.isHorizontal,
                res.word.line,
                res.word.column
            );

            if (!res.isHost) {
                word.IsFoundByOpponent = true;
                this.manageIfNotHost(res, word);
            }
            this.placeWord(word);
            this.defService.AllWords.forEach((w: Word) => {
                if (w.Line === word.Line && w.Column === word.Column && w.IsHorizontal && word.IsHorizontal) {
                    w = word;
                }
            });
        });
    }

    private manageIfNotHost(res: { word: IWord; isHost: boolean; }, word: Word): void {
        for (let i: number = 0; i < res.word.word.length; i++) {
            if (res.word.isHorizontal) {
                this.letterGrid[res.word.line][res.word.column + i].IsFoundByOpponent = true;
                this.addLetter(word, res.word.word[i].toUpperCase(), res.word.line, res.word.column + i);
            } else {
                this.letterGrid[res.word.line + i][res.word.column].IsFoundByOpponent = true;
                this.addLetter(word, res.word.word[i].toUpperCase(), res.word.line + i, res.word.column);
            }
        }
    }

    private listenOpponentSelectsWord(): void {
        this.socketService.selectWord().subscribe((res) => {
            this.opponentSelectedWord = this.defService.AllWords.find((w: Word) => {
                return w.IsHorizontal &&
                    res.word.isHorizontal &&
                    w.Line === res.word.line &&
                    w.Column === res.word.column;
            });
        });
    }

    private listenSelectedWord(): void {
        this.defService.SelectWordSub.subscribe((res) => {
            this.socketService.emitWordSelected(SELECTED_WORD, this.defService.SelectedWord);
            this.focusOnWord(res.word);
        });
    }

    private listenLetterInput(): void {
        this.inputService.LetterInputSub.subscribe((res) => {
            this.addLetter(this.defService.SelectedWord, res.letter, res.i, res.j);
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
            if (this.isValidWord(this.defService.SelectedWord)) {
                this.socketService.emitWordFound(WORD_CORRECT, this.defService.SelectedWord);
                this.placeWord(this.defService.SelectedWord);
            }
        });
    }

    public isPartOfWord(word: Word, i: number, j: number): boolean {
        return Word.isPartOfWord(word, i, j);
    }

    public isCompleted(): boolean {
        let isCompleted: boolean = true;

        for (let i: number = 0; i < this.letterGrid.length; i++) {
            for (let j: number = 0; j < this.letterGrid[0].length; j++) {
                isCompleted = isCompleted && (this.crosswordService.FormattedGrid.letters[i][j] === ""
                    || this.letterGrid[i][j].IsPlaced);
            }

            return isCompleted;
        }

        return isCompleted;
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

    private addLetter(word: Word, letter: string, i: number, j: number): void {
        if (!this.letterGrid[i][j].IsPlaced) {
            this.letterGrid[i][j].Letter = letter;
        }
        if (!word.IsFoundByOpponent && this.verifyEndOfWord(word, i, j)) {
            this.socketService.emitWordFound(WORD_CORRECT, word);
        }
    }

    private verifyEndOfWord(word: Word, i: number, j: number): boolean {
        if (Word.isEndOfWord(word, i, j) && this.isValidWord(word)) {
            this.placeWord(word);

            return true;
        }

        return false;
    }

    private removeLetter(i: number, j: number): void {
        if (!this.letterGrid[i][j].IsPlaced) {
            this.letterGrid[i][j].Letter = "";
        }
    }

    private isValidWord(word: Word): boolean {
        let i: number = word.Line;
        let j: number = word.Column;
        for (const letter of word.Word.split("")) {
            if (letter.toUpperCase() !== this.letterGrid[i][j].Letter.toUpperCase()) {
                return false;
            }
            i = word.IsHorizontal ? i : i + 1;
            j = word.IsHorizontal ? j + 1 : j;
        }
        word.Word.toUpperCase();

        return true;
    }

    private placeWord(word: Word): void {
        let i: number = word.Line;
        let j: number = word.Column;
        word.Word.split("").forEach(() => {
            this.letterGrid[i][j].IsPlaced = true;
            i = word.IsHorizontal ? i : i + 1;
            j = word.IsHorizontal ? j + 1 : j;
        });

        word.IsPlaced = true;
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
    public isWordIntersection(i: number, j: number): boolean {
        return (this.findWordWithCase(this.defService.HorizontalWords, i, j) &&
            this.findWordWithCase(this.defService.VerticalWords, i, j));

    }
    public casePlaced(i: number, j: number): boolean {
        return this.letterGrid[i][j].IsPlaced;
    }
}
