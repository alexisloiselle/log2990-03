import { Component, OnInit, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// import { Game } from "../game";
import { CrosswordService } from "./../services/crossword/crossword.service";
import { FormattedGrid } from "../formatted-grid";
import { DefintionsSorter } from "./../definitions-sorter";
import { Word } from "./../word";

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
    // private game: Game;

    public constructor(protected crosswordService: CrosswordService, private route: ActivatedRoute) {
        this.listenLetterInput();
        this.listenBackspaceInput();
        this.listenArrowInput();
    }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe((params) => {
            // this.difficulty = params["difficulty"];
            this.difficulty = "mock";
        });
        this.isCheatModeOn = false;
        this.fGrid = await this.crosswordService.generateGrid(this.difficulty);
        // this.game = new Game(this.difficulty);
        const definitionsSorter: DefintionsSorter = new DefintionsSorter(this.fGrid);
        this.horizontalWords = definitionsSorter.HorizontalDefintions;
        this.verticalWords = definitionsSorter.VerticalDefinitions;
    }

    private listenLetterInput(): void {
        this.crosswordService.LetterInputSub.subscribe((res) => {
            this.focusOnNextCase(res.i, res.j);
        });
    }

    private listenBackspaceInput(): void {
        this.crosswordService.BackspaceInputSub.subscribe((res) => {
            this.focusOnPreviousCase(res.i, res.j);
        });
    }

    private listenArrowInput(): void {
        this.crosswordService.ArrowInputSub.subscribe((res) => {
            this.focusOnArrowCase(res.keyCode, res.i, res.j);
        });
    }

    public set IsCheatModeOn(isCheatModeOn: boolean) {
        this.isCheatModeOn = isCheatModeOn;
    }

    private focusOnNextCase(i: number, j: number): void {
        if (this.isPartHorizontalWord(i, j)) {
            console.log('horizontal');
            this.focusOnCase(i, j + 1);
        } else {
            console.log('vertical');
            this.focusOnCase(i + 1, j);
        }
    }

    private focusOnPreviousCase(i: number, j: number): void {
        if (this.isPartHorizontalWord(i, j)) {
            this.focusOnCase(i, j - 1);
        } else {
            this.focusOnCase(i - 1, j);
        }
    }

    private focusOnArrowCase(keyCode: number, i: number, j: number): void {

    }

    private focusOnCase(i: number, j: number): boolean {
        const c: any = this.cases.toArray().find((ca: any) => {
            return ca.nativeElement.getAttribute("id") === `${i}${j}`;
        });
        console.log(c);
        c.nativeElement.focus();
        return true;
    }

    private isPartHorizontalWord(i: number, j: number): boolean {
        return this.horizontalWords.filter((word: Word) => {
            return word.Line === i
                && word.Column <= j
                && word.Column + word.Word.length - 1 >= j;
        }).length > 0;
    }
}
