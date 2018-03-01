import { DefinitionsSorter } from "./definitions-sorter";
import { IFormattedGrid } from "./formatted-grid";
import { Word } from "./word";
import { } from "jasmine";

describe("DefinitionSorter", () => {
    // tslint:disable:no-magic-numbers
    const formattedGrid: IFormattedGrid = { letters: [[]], words: [] };
    formattedGrid.words.push({
        word: "foo",
        definition: "foo-def",
        isHorizontal: true,
        position: { x: 3, y: 4 }
    });
    formattedGrid.words.push({
        word: "bar",
        definition: "bar-def",
        isHorizontal: true,
        position: { x: 1, y: 1 }
    });
    formattedGrid.words.push({
        word: "food",
        definition: "food-def",
        isHorizontal: false,
        position: { x: 5, y: 6 }
    });
    formattedGrid.words.push({
        word: "Falafel",
        definition: "Falafel-def",
        isHorizontal: true,
        position: { x: 9, y: 9 }
    });
    formattedGrid.words.push({
        word: "Tofudog",
        definition: "Tofudog-def",
        isHorizontal: false,
        position: { x: 1, y: 9 }
    });
    formattedGrid.words.push({
        word: "Michel",
        definition: "Michel-def",
        isHorizontal: false,
        position: { x: 4, y: 5 }
    });

    const defitionsSorter: DefinitionsSorter = new DefinitionsSorter(formattedGrid);

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

    it("Should the seperate array in two arrays", () => {
        expect(defitionsSorter.HorizontalDefinitions).toEqual(horizontalWords);
        expect(defitionsSorter.VerticalDefinitions).toEqual(verticalWords);
    });
});
