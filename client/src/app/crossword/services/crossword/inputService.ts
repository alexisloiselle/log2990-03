import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class InputService {

    private letterInputSub: Subject<any>;
    private backspaceInputSub: Subject<any>;
    private arrowInputSub: Subject<any>;

    public constructor() {
        this.letterInputSub = new Subject();
        this.backspaceInputSub = new Subject();
        this.arrowInputSub = new Subject();
    }

    get LetterInputSub(): Observable<any> {
        return this.letterInputSub.asObservable();
    }

    get BackspaceInputSub(): Observable<any> {
        return this.backspaceInputSub.asObservable();
    }

    get ArrowInputSub(): Observable<any> {
        return this.arrowInputSub.asObservable();
    }

    public handleKey(event: any, i: number, j: number): boolean {
        const letter = String.fromCharCode(event.keyCode);
        console.log(event);
        if(this.isLetter(event.keyCode)){
            console.log('letter input');
            this.letterInputSub.next({letter ,i, j});
            return true;
        } else if (this.isBackspace(event.keyCode)){
            console.log('backspace input');
            this.backspaceInputSub.next({i, j});
            return true;
        } else if (this.isArrow(event.keyCode)) {
            console.log('arrow input');
            let allo = event.keyCode;
            this.arrowInputSub.next({allo, i, j});
            return true;
        }
        return false;
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
}
