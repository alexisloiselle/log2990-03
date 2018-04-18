import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import {
    CrosswordCommand,
    LetterCommand,
    ArrowCommand,
    BackspaceCommand,
    EnterCommand
} from "./input-command";

const MIN_LETTER_KEYCODE: number = 65;
const MAX_LETTER_KEYCODE: number = 90;
const BACKSPACE_KEYCODE: number = 8;
const MIN_ARROW_KEYCODE: number = 37;
const MAX_ARROW_KEYCODE: number = 40;
const ENTER_KEYCODE: number = 13;

@Injectable()
export class InputService {
    private keyMap: Map<number, CrosswordCommand>;

    private letterInputSub: Subject<{ letter: string, i: number, j: number }>;
    private backspaceInputSub: Subject<{ i: number, j: number }>;
    private arrowInputSub: Subject<{ keyCode: number, i: number, j: number }>;
    private enterInputSub: Subject<{}>;

    public constructor() {
        this.letterInputSub = new Subject();
        this.backspaceInputSub = new Subject();
        this.arrowInputSub = new Subject();
        this.enterInputSub = new Subject();
        this.keyMap = new Map<number, CrosswordCommand>();
        this.initKeyMap();
    }

    private initKeyMap(): void {
        this.initLetterKeymap();
        this.initArrowKeymap();
        this.keyMap.set(BACKSPACE_KEYCODE, new BackspaceCommand(this.backspaceInputSub));
        this.keyMap.set(ENTER_KEYCODE, new EnterCommand(this.enterInputSub));
    }

    private initLetterKeymap(): void {
        for (let i: number = MIN_LETTER_KEYCODE; i <= MAX_LETTER_KEYCODE; i++) {
            this.keyMap.set(i, new LetterCommand(this.letterInputSub));
        }
    }

    private initArrowKeymap(): void {
        for (let i: number = MIN_ARROW_KEYCODE; i <= MAX_ARROW_KEYCODE; i++) {
            this.keyMap.set(i, new ArrowCommand(this.arrowInputSub));
        }
    }

    public get LetterInputSub(): Observable<{ letter: string, i: number, j: number }> {
        return this.letterInputSub.asObservable();
    }

    public get BackspaceInputSub(): Observable<{ i: number, j: number }> {
        return this.backspaceInputSub.asObservable();
    }

    public get ArrowInputSub(): Observable<{ keyCode: number, i: number, j: number }> {
        return this.arrowInputSub.asObservable();
    }

    public get EnterInputSub(): Observable<{}> {
        return this.enterInputSub.asObservable();
    }

    public handleKey(keyCode: number, i: number, j: number): boolean {
        const letter: string = String.fromCharCode(keyCode);
        const command: CrosswordCommand = this.keyMap.get(keyCode);
        if (command !== undefined) {
            command.execute(keyCode, i, j, letter);

            return true;
        }

        return false;
    }
}
