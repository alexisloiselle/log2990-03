import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

const MIN_LETTER_KEYCODE: number = 65;
const MAX_LETTER_KEYCODE: number = 90;
const BACKSPACE_KEYCODE: number = 8;
const MIN_ARROW_KEYCODE: number = 37;
const MAX_ARROW_KEYCODE: number = 40;
const ENTER_KEYCODE: number = 13;

@Injectable()
export class InputService {

    private letterInputSub: Subject<{letter: string, i: number, j: number}>;
    private backspaceInputSub: Subject<{i: number, j: number}>;
    private arrowInputSub: Subject<{keyCode: number, i: number, j: number}>;
    private enterInputSub: Subject<{}>;

    public constructor() {
        this.letterInputSub = new Subject();
        this.backspaceInputSub = new Subject();
        this.arrowInputSub = new Subject();
        this.enterInputSub = new Subject();
    }

    public get LetterInputSub(): Observable<{letter: string, i: number, j: number}> {
        return this.letterInputSub.asObservable();
    }

    public get BackspaceInputSub(): Observable<{i: number, j: number}> {
        return this.backspaceInputSub.asObservable();
    }

    public get ArrowInputSub(): Observable<{keyCode: number, i: number, j: number}> {
        return this.arrowInputSub.asObservable();
    }

    public get EnterInputSub(): Observable<{}> {
        return this.enterInputSub.asObservable();
    }

    public handleKey(event: KeyboardEvent, i: number, j: number): boolean {
        event.preventDefault();
        const letter: string = String.fromCharCode(event.keyCode);

        switch (true) {
            case this.isLetter(event.keyCode):
                this.letterInputSub.next({ letter, i, j });

                return true;
            case this.isBackspace(event.keyCode):
                this.backspaceInputSub.next({ i, j });

                return true;
            case this.isArrow(event.keyCode):
                const keyCode: number = event.keyCode;
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
        return keyCode >= MIN_LETTER_KEYCODE && keyCode <= MAX_LETTER_KEYCODE;
    }

    private isBackspace(keyCode: number): boolean {
        return keyCode === BACKSPACE_KEYCODE;
    }

    private isArrow(keyCode: number): boolean {
        return keyCode >= MIN_ARROW_KEYCODE && keyCode <= MAX_ARROW_KEYCODE;
    }

    private isEnter(keyCode: number): boolean {
        return keyCode === ENTER_KEYCODE;
    }
}
