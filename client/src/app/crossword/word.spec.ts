import { } from "jasmine";
import { Word } from "./word";

describe("Word", () => {
    // tslint:disable:no-magic-numbers
    it ("should return true if it is the end of an horizontal word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", true, 0, 0);
        expect(Word.isEndOfWord(word, 0, 6)).toBeTruthy();
    });

    it ("should return false if it is not the end of an horizontal word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", true, 0, 0);
        expect(Word.isEndOfWord(word, 0, 2)).toBeFalsy();
    });

    it ("should return true if it is the end of vertical word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", false, 0, 0);
        expect(Word.isEndOfWord(word, 6, 0)).toBeTruthy();
    });

    it ("should return false if it is not the end of a vertical word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", false, 0, 0);
        expect(Word.isEndOfWord(word, 2, 0)).toBeFalsy();
    });

    it ("should return true if it is the beggining of an horizontal word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", true, 0, 0);
        expect(Word.isBeginningOfWord(word, 0, 0)).toBeTruthy();
    });

    it ("should return false if it is not the beggining of an horizontal word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", true, 0, 0);
        expect(Word.isBeginningOfWord(word, 0, 2)).toBeFalsy();
    });

    it ("should return true if it is the beggining of vertical word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", false, 0, 0);
        expect(Word.isBeginningOfWord(word, 0, 0)).toBeTruthy();
    });

    it ("should return false if it is not the beggining of a vertical word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", false, 0, 0);
        expect(Word.isBeginningOfWord(word, 2, 0)).toBeFalsy();
    });

    it ("should return true if it is part of the horizontal word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", true, 0, 0);
        expect(Word.isPartOfWord(word, 0, 2)).toBeTruthy();
    });

    it ("should return false if it is not part of the horizontal word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", true, 0, 0);
        expect(Word.isPartOfWord(word, 0, 7)).toBeFalsy();
    });

    it ("should return true if it is part of the vertical word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", false, 0, 0);
        expect(Word.isPartOfWord(word, 2, 0)).toBeTruthy();
    });

    it ("should return false if it is not part of the vertical word", () => {
        const word: Word = new Word("Vincent", "A beautiful red head. Brilliant and intelligent", false, 0, 0);
        expect(Word.isPartOfWord(word, 7, 0)).toBeFalsy();
    });
});
