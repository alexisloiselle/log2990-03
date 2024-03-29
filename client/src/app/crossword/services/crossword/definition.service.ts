import { Injectable, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Word } from "../../word";
import { CrosswordService } from "./crossword.service";
import { DefinitionsSorter } from "../../definitions-sorter";

@Injectable()
export class DefinitionService {

    private selectWordSub: Subject<{ word: Word }>;
    private selectedWord: Word;

    private horizontalWords: Word[];
    private verticalWords: Word[];
    private allWords: Word[];
    private isCheatModeOn: boolean;

    public constructor(
        private crosswordService: CrosswordService
    ) {
        this.selectWordSub = new Subject();
        window.document.addEventListener("click", (ev) => this.unselectWord(ev));
    }

    public get SelectWordSub(): Observable<{ word: Word }> {
        return this.selectWordSub.asObservable();
    }

    public get SelectedWord(): Word {
        return this.selectedWord;
    }

    public set SelectedWord(value: Word) {
        this.selectedWord = value;
    }

    public get HorizontalWords(): Word[] {
        return this.allWords.filter((word: Word) => {
            return word.IsHorizontal;
        });
    }

    public get VerticalWords(): Word[] {
        return this.allWords.filter((word: Word) => {
            return !word.IsHorizontal;
        });
    }

    public get AllWords(): Word[] {
        return this.allWords;
    }

    public set AllWords(value: Word[]) {
        this.allWords = value;
    }

    public get IsCheatModeOn(): boolean {
        return this.isCheatModeOn;
    }

    public set IsCheatModeOn(value: boolean) {
        this.isCheatModeOn = value;
    }

    public configureDefinitions(): void {
        const definitionsSorter: DefinitionsSorter = new DefinitionsSorter(this.crosswordService.FormattedGrid);
        this.horizontalWords = definitionsSorter.HorizontalDefinitions;
        this.verticalWords = definitionsSorter.VerticalDefinitions;
        this.allWords = this.verticalWords.concat(this.horizontalWords);
    }

    public handleClickDef(word: Word): void {
        this.selectedWord = word;
        this.selectWordSub.next({ word });
    }

    private unselectWord(event: MouseEvent): void {
        const classes: ElementRef["nativeElement"] = event.toElement.getAttribute("class");
        if (classes === null || !classes.includes("canSelect")) {
            this.selectedWord = undefined;
        }
    }
}
