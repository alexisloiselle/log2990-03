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
import {FocusCaseService} from "./focus-case.service";

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
        private socketService: SocketService,
        private focusCaseService: FocusCaseService
    ) { }

    public ngOnInit(): void {
        this.numberPlacedWords = 0;
        this.listenSelectedWord();
        this.listenLetterInput();
        if (this.isMultiplayer()) {
            this.listenOpponentSelectsWord();
            this.listenWordCorrect();
        }
        this.listenBackspaceInput();
        this.listenArrowInput();
        this.listenEnterInput();
        this.letterGrid = this.initLetterGrid(this.crosswordService.FormattedGrid.letters.length);
        this.letterGrid.forEach((line) => line.forEach((word) => word.IsPlaced = false));
        this.letterGrid.forEach((line) => line.forEach((word) => word.IsFoundByOpponent = false));
        this.opponentSelectedWord = null;
    }

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
            this.updateAllWords(word);
        });
    }

    private updateAllWords(word: Word): void {
        this.defService.AllWords = this.defService.AllWords.map((w: Word) => {
            if (w.Line === word.Line && w.Column === word.Column && w.IsHorizontal === word.IsHorizontal) {
                return word;
            }

            return w;
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
                return w.IsHorizontal === res.word.isHorizontal &&
                    w.Line === res.word.line &&
                    w.Column === res.word.column;
            });
        });
    }

    private listenSelectedWord(): void {
        this.defService.SelectWordSub.subscribe((res) => {
            if (this.isMultiplayer()) {
                this.socketService.emitWordSignal(SELECTED_WORD, this.defService.SelectedWord);
            }
            this.focusCaseService.focusOnCase(res.word.Line, res.word.Column, this.cases);
        });
    }

    private listenLetterInput(): void {
        this.inputService.LetterInputSub.subscribe((res) => {
            this.addLetter(this.defService.SelectedWord, res.letter, res.i, res.j);
            this.focusCaseService.focusOnNextCase(res.i, res.j, this.cases);
        });
    }

    private listenBackspaceInput(): void {
        this.inputService.BackspaceInputSub.subscribe((res) => {
            this.removeLetter(res.i, res.j);
            this.focusCaseService.focusOnPreviousCase(res.i, res.j, this.cases);
        });
    }

    private listenArrowInput(): void {
        this.inputService.ArrowInputSub.subscribe((res) => {
            this.focusCaseService.focusOnArrowCase(res.keyCode, res.i, res.j, this.cases);
        });
    }

    private listenEnterInput(): void {
        this.inputService.EnterInputSub.subscribe((res) => {
            if (this.isValidWord(this.defService.SelectedWord)) {
                if (this.isMultiplayer()) {
                    this.socketService.emitWordSignal(WORD_CORRECT, this.defService.SelectedWord);
                }
                this.placeWord(this.defService.SelectedWord);
            }
        });
    }

    public isPartOfWord(word: Word, i: number, j: number): boolean {
        if (word !== null) {
            return Word.isPartOfWord(word, i, j);
        } else {
            return false;
        }
    }

    public isCompleted(): boolean {
        let isCompleted: boolean = true;

        for (let i: number = 0; i < this.letterGrid.length; i++) {
            for (let j: number = 0; j < this.letterGrid[0].length; j++) {
                isCompleted = isCompleted && (this.crosswordService.FormattedGrid.letters[i][j] === ""
                    || this.letterGrid[i][j].IsPlaced);
            }
        }

        return isCompleted;
    }

    public selectWordFromCase(i: number, j: number): void {
        for (const word of this.defService.AllWords) {
            if (Word.isPartOfWord(word, i, j)) {
                this.defService.handleClickDef(word);
            }
        }
    }

    private findWordWithCase(words: Word[], i: number, j: number, callback: Function): void {
        for (const word of words) {
            if (Word.isPartOfWord(word, i, j)) {
                callback(word);
            }
        }
    }

    private addLetter(word: Word, letter: string, i: number, j: number): void {
        if (!this.letterGrid[i][j].IsPlaced) {
            this.letterGrid[i][j].Letter = letter;
        }
        if (!word.IsFoundByOpponent && this.verifyEndOfWord(word, i, j)) {
            if (this.isMultiplayer()) {
                this.socketService.emitWordSignal(WORD_CORRECT, word);
            }
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
            word.IsHorizontal ? j++ : i++;
        }
        word.Word.toUpperCase();

        return true;
    }

    private placeWord(word: Word): void {
        let i: number = word.Line;
        let j: number = word.Column;

        word.Word.split("").forEach(() => {
            this.letterGrid[i][j].IsPlaced = true;
            word.IsHorizontal ? j++ : i++;
        });
        word.IsPlaced = true;
    }

    public isPlacedByDifferentPlayers(i: number, j: number): boolean {
        let res: boolean = false;

        this.findWordWithCase(this.defService.HorizontalWords, i, j, (hWord: Word) => {
            this.findWordWithCase(this.defService.VerticalWords, i, j, (vWord: Word) => {
                if ((hWord.IsPlaced && vWord.IsPlaced) &&
                    (hWord.IsFoundByOpponent !== vWord.IsFoundByOpponent)) {
                    res = true;
                }
            });
        });

        return res;
    }
}
