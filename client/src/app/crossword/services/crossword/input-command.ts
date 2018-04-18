import { Subject } from "rxjs/Subject";

// tslint:disable:max-classes-per-file
export abstract class CrosswordCommand {
    public abstract execute(keyCode: number, i: number, j: number, letter?: string): void;
}

export class LetterCommand extends CrosswordCommand {
    public constructor(
        private letterInputSub: Subject<{ letter: string, i: number, j: number }>
    ) {
        super();
    }

    public execute(keyCode: number, i: number, j: number, letter: string): void {
        this.letterInputSub.next({ letter, i, j });
    }
}

export class ArrowCommand extends CrosswordCommand {
    public constructor(
        private arrowInputSub: Subject<{ keyCode: number, i: number, j: number }>
    ) {
        super();
    }

    public execute(keyCode: number, i: number, j: number): void {
        this.arrowInputSub.next({ keyCode, i, j });
    }
}

export class BackspaceCommand extends CrosswordCommand {
    public constructor(
        private backspaceSub: Subject<{ i: number, j: number }>
    ) {
        super();
    }

    public execute(keyCode: number, i: number, j: number): void {
        this.backspaceSub.next({i, j });
    }
}

export class EnterCommand extends CrosswordCommand {
    public constructor(
        private enterSub: Subject<{}>
    ) {
        super();
    }

    public execute(keyCode: number, i: number, j: number): void {
        this.enterSub.next({});
    }
}
