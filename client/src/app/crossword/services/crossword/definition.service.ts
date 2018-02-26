import { Injectable, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Word } from "../../word";
import { CrosswordService } from "./crossword.service";
import { DefinitionsSorter } from "../../definitions-sorter";

@Injectable()
export class DefinitionService {

    private selectWordSub: Subject<{word: Word}>;
    private selectedWord: Word;

    private horizontalWords: Word[];
    private verticalWords: Word[];
    private isCheatModeOn: boolean;

    public constructor(
        private crosswordService: CrosswordService
    ) {
        this.selectWordSub = new Subject();
        window.document.addEventListener("click", (ev) => this.unselectWord(ev));
    }

    public get SelectWordSub(): Observable<{word: Word}> {
        return this.selectWordSub.asObservable();
    }

    public get SelectedWord(): Word {
        return this.selectedWord;
    }

    public set SelectedWord(value: Word) {
        this.selectedWord = value;
    }

    public get HorizontalWords(): Word[] {
        return this.horizontalWords;
    }

    public get VerticalWords(): Word[] {
        return this.verticalWords;
    }

    public get IsCheatModeOn(): boolean {
        return this.isCheatModeOn;
    }

    public set IsCheatModeOn(value: boolean) {
        this.isCheatModeOn = value;
    }

    public configureDefinitions(): void {
        const definitionsSorter: DefinitionsSorter = new DefinitionsSorter(this.crosswordService.FGrid);
        this.horizontalWords = definitionsSorter.HorizontalDefinitions;
        this.verticalWords = definitionsSorter.VerticalDefinitions;
    }

    public handleClickDef(word: Word): boolean {
        this.selectedWord = word;
        this.selectWordSub.next({ word });

        return true;
    }

    // TS doesn't recognize path on type MouseEvent
    // tslint:disable-next-line:no-any
    private unselectWord(event: any): void {
        const classes: ElementRef["nativeElement"] = event.path[0].getAttribute("class");
        if (classes === null || !classes.includes("canSelect")) {
            this.selectedWord = undefined;
        }
    }
}
