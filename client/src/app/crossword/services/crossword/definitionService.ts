import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Word } from "../../word";

@Injectable()
export class DefinitionService {

    private selectWordSub: Subject<any>;
    private selectedWord: Word;

    public constructor() {
        this.selectWordSub = new Subject();
        window.document.addEventListener("click", (ev) => this.unselectWord(ev));
    }

    public get SelectWordSub(): Observable<any> {
        return this.selectWordSub.asObservable();
    }

    public get SelectedWord(): Word {
        return this.selectedWord;
    }
    
    public set SelectedWord(value: Word) {
        this.selectedWord = value;
    }

    public handleClickDef(word: Word): boolean {
        this.selectedWord = word;
        this.selectWordSub.next({word});
        return true;
    }

    private unselectWord(event: any): void {
        const classes = event.path[0].getAttribute("class");
        console.log(classes);
        if(classes === null || !classes.includes("canSelect")) {
            this.selectedWord = undefined;
        }
    }
}
