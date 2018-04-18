import { Injectable, ElementRef, QueryList} from "@angular/core";
import {Word} from "../word";
import {DefinitionService} from "../services/crossword/definition.service";

const LEFT_KEYCODE: number = 37;
const UP_KEYCODE: number = 38;
const RIGHT_KEYCODE: number = 39;
const DOWN_KEYCODE: number = 40;

@Injectable()
export class FocusCaseService {

  public constructor(private defService: DefinitionService) { }

  public focusOnArrowCase(keyCode: number, i: number, j: number, cases: QueryList<ElementRef>): void {
  switch (keyCode) {
      case LEFT_KEYCODE:
      case UP_KEYCODE:
          this.focusOnPreviousCase(i, j, cases);
          break;
      case RIGHT_KEYCODE:
      case DOWN_KEYCODE:
          this.focusOnNextCase(i, j, cases);
          break;
      default:
          break;
  }
}

  public focusOnNextCase(i: number, j: number, cases: QueryList<ElementRef>): void {
    if (!Word.isEndOfWord(this.defService.SelectedWord, i, j)) {
        this.defService.SelectedWord.IsHorizontal ?
            this.focusOnCase(i, j + 1, cases) :
            this.focusOnCase(i + 1, j, cases);
    }
}

  public focusOnPreviousCase(i: number, j: number, cases: QueryList<ElementRef>): void {
    if (!Word.isBeginningOfWord(this.defService.SelectedWord, i, j)) {
        this.defService.SelectedWord.IsHorizontal ?
            this.focusOnCase(i, j - 1, cases) :
            this.focusOnCase(i - 1, j, cases);
    }
}
  public focusOnCase(i: number, j: number, cases: QueryList<ElementRef>): void {
    const caseFound: ElementRef = cases.toArray().find((c: ElementRef) => {
        return c.nativeElement.getAttribute("id") === `${i}${j}`;
    });
    if (caseFound !== undefined) {
        caseFound.nativeElement.focus();
        caseFound.nativeElement.select();
    }
  }
}
