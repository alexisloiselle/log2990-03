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

    get SelectWordSub(): Observable<any> {
        return this.selectWordSub.asObservable();
    }

    get SelectedWord(): Word {
        return this.selectedWord;
    }

    public handleClickDef(word: Word): boolean {
        this.selectedWord = word;
        this.selectWordSub.next({word});
        return true;
    }
}
