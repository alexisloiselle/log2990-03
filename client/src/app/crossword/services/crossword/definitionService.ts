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
    }

    public get SelectWordSub(): Observable<any> {
        return this.selectWordSub.asObservable();
    }

    public get SelectedWord(): Word {
        return this.selectedWord;
    }

    public handleClickDef(word: Word): boolean {
        this.selectedWord = word;
        this.selectWordSub.next({word});
        return true;
    }
}
