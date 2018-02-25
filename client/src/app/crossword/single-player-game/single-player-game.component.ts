import { Component, OnInit, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// import { Game } from "../game";
import { CrosswordService } from "./../services/crossword/crossword.service";
import { FormattedGrid } from "../formatted-grid";
import { DefintionsSorter } from "./../definitions-sorter";
import { Word } from "./../word";
import { InputService } from "../services/crossword/inputService";
import { DefinitionService } from "../services/crossword/definitionService";

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
    public letterGrid: string[][];
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

    private initLetterGrid(letters: string[][]): string[][] {
        return letters.map((line) => {
            return line.map((letter) => {
                return "";
            });
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

    private listenSelectedWord(): void {
        this.defService.SelectWordSub.subscribe((res) => {
            this.focusOnWord(res.word);
        });
    }

    public set IsCheatModeOn(isCheatModeOn: boolean) {
        this.isCheatModeOn = isCheatModeOn;
    }

    private addLetter(letter: string, i: number, j: number): void {
        this.letterGrid[i][j] = letter;
    }

    private removeLetter(i: number, j: number): void {
        this.letterGrid[i][j] = "";
    }

    private focusOnNextCase(i: number, j: number): void {
        if(this.defService.SelectedWord === undefined){
            return;
        } else if (!Word.isEndOfWord(this.defService.SelectedWord, i, j)){
            if (this.defService.SelectedWord.IsHorizontal) {
                this.focusOnCase(i, j + 1);
            } else {
                this.focusOnCase(i + 1, j);
            }
        }
    }

    private focusOnPreviousCase(i: number, j: number): void {
        if(this.defService.SelectedWord === undefined) {
            return;
        } else if (!Word.isBeginningOfWord(this.defService.SelectedWord, i, j)) {
            if (this.defService.SelectedWord.IsHorizontal) {
                this.focusOnCase(i, j - 1);
            } else {
                this.focusOnCase(i - 1, j);
            }
        }
    }

    private focusOnArrowCase(keyCode: number, i: number, j: number): void {
        return;
    }

    private focusOnWord(word: Word): void {
        this.focusOnCase(word.Line, word.Column);
    }

    private focusOnCase(i: number, j: number): void {
        const c: any = this.cases.toArray().find((ca: any) => {
            return ca.nativeElement.getAttribute("id") === `${i}${j}`;
        });
        console.log(c);
        c.nativeElement.focus();
    }
}
