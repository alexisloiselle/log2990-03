import { DefintionsSorter } from "./definitions-sorter";
import { FormattedGrid } from "./formatted-grid";
import { Word } from "./word";

describe("DefinitionSorter", () => {
    // tslint:disable:no-magic-numbers
    const fGrid: FormattedGrid = {letters: [[]], words: []};
    fGrid.words.push({
        word: "foo",
        def: "foo-def",
        isHorizontal: true,
        position: { x: 3, y: 4 }
    });
    fGrid.words.push({
        word: "bar",
        def: "bar-def",
        isHorizontal: true,
        position: { x: 1, y: 1 }
    });
    fGrid.words.push({
        word: "food",
        def: "food-def",
        isHorizontal: false,
        position: { x: 5, y: 6 }
    });
    fGrid.words.push({
        word: "Falafel",
        def: "Falafel-def",
        isHorizontal: true,
        position: { x: 9, y: 9 }
    });
    fGrid.words.push({
        word: "Tofudog",
        def: "Tofudog-def",
        isHorizontal: false,
        position: { x: 1, y: 9 }
    });
    fGrid.words.push({
        word: "Michel",
        def: "Michel-def",
        isHorizontal: false,
        position: { x: 4, y: 5 }
    });

    const defitionsSorter: DefintionsSorter = new DefintionsSorter(fGrid);

    const word1: Word = new Word("foo", "foo-def", true, 3, 4);
    const word2: Word = new Word("bar", "bar-def", true, 1, 1);
    const word3: Word = new Word("Falafel", "Falafel-def", true, 9, 9);
    const horizontalWords: Word[] = new Array;
    horizontalWords.push(word2);
    horizontalWords.push(word1);
    horizontalWords.push(word3);

    const word4: Word = new Word("food", "food-def", false, 5, 6);
    const word5: Word = new Word("Tofudog", "Tofudog-def", false, 1, 9);
    const word6: Word = new Word("Michel", "Michel-def", false, 4, 5);
    const verticalWords: Word[] = new Array;
    verticalWords.push(word6);
    verticalWords.push(word4);
    verticalWords.push(word5);

    it("Should the array in two arrays", () => {
        expect(defitionsSorter.HorizontalDefintions).toEqual(horizontalWords);
        expect(defitionsSorter.VerticalDefinitions).toEqual(verticalWords);
    });
});
