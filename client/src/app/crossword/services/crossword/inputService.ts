import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class InputService {

    private letterInputSub: Subject<any>;
    private backspaceInputSub: Subject<any>;
    private arrowInputSub: Subject<any>;
    private enterInputSub: Subject<any>;

    public constructor() {
        this.letterInputSub = new Subject();
        this.backspaceInputSub = new Subject();
        this.arrowInputSub = new Subject();
        this.enterInputSub = new Subject();
    }

    public get LetterInputSub(): Observable<any> {
        return this.letterInputSub.asObservable();
    }

    public get BackspaceInputSub(): Observable<any> {
        return this.backspaceInputSub.asObservable();
    }

    public get ArrowInputSub(): Observable<any> {
        return this.arrowInputSub.asObservable();
    }
    
    public get EnterInputSub(): Observable<any> {
        return this.enterInputSub.asObservable();
    }

    public handleKey(event: any, i: number, j: number): boolean {
        event.preventDefault();
        const letter = String.fromCharCode(event.keyCode);

        switch (true) {
            case this.isLetter(event.keyCode):
                this.letterInputSub.next({ letter, i, j });
                return true;
            case this.isBackspace(event.keyCode):
                this.backspaceInputSub.next({ i, j });
                return true;
            case this.isArrow(event.keyCode):
                let keyCode = event.keyCode;
                this.arrowInputSub.next({ keyCode, i, j });
                return true;
            case this.isEnter(event.keyCode):
                this.enterInputSub.next({});
                return true;
            default:
                return false;
        }
    }

    private isLetter(keyCode: number): boolean {
        return keyCode >= 65 && keyCode <= 90;
    }

    private isBackspace(keyCode: number): boolean {
        return keyCode === 8;
    }

    private isArrow(keyCode: number): boolean {
        return keyCode >= 37 && keyCode <= 40;
    }

    private isEnter(keyCode: number): boolean {
        return keyCode === 13;
    }
}
