import { GridComponent } from "./grid.component";
import { InputService } from "../services/crossword/input.service";
import { DefinitionService } from "../services/crossword/definition.service";
import { Word } from "../word";

// to test
// tslint:disable:no-magic-numbers
// tslint:disable-next-line:no-any
const crosswordService: any = {
    formattedGrid: {
        letters: [
            ["", "a", "", "", "b", "a", "c", "o", "n", ""],
            ["s", "l", "", "m", "o", "r", "a", "l", "", "a"],
            ["p", "a", "d", "", "b", "", "g", "d", "", "c"],
            ["a", "s", "p", "", "", "e", "e", "", "", "e"],
            ["", "", "", "e", "", "n", "", "l", "a", "t"],
            ["a", "f", "a", "r", "", "d", "", "", "", "i"],
            ["c", "", "b", "a", "d", "", "a", "", "r", "c"],
            ["e", "", "b", "", "l", "a", "b", "", "a", ""],
            ["", "b", "e", "d", "", "", "l", "", "y", ""],
            ["a", "n", "y", "", "", "s", "e", "a", "", ""]
        ],
        words: [
            {
                word: "alas",
                definition: "by bad luck",
                isHorizontal: false,
                position: { x: 0, y: 1 }
            },
            {
                word: "bacon",
                definition: "back and sides of a hog salted and dried or smoked; usually sliced thin and fried",
                isHorizontal: true,
                position: { x: 0, y: 4 }
            },
            {
                word: "bob",
                definition: "a short abrupt inclination (as of the head)",
                isHorizontal: false,
                position: { x: 0, y: 4 }
            },
            {
                word: "cage",
                definition: "an enclosure made or wire or metal bars in which birds or animals are kept",
                isHorizontal: false,
                position: { x: 0, y: 6 }
            },
            {
                word: "old",
                definition: "past times (especially in the phrase `in days of old')",
                isHorizontal: false,
                position: { x: 0, y: 7 }
            },
            {
                word: "spa",
                definition: "a place of business with equipment and facilities for exercising and \
                improving physical fitness",
                isHorizontal: false,
                position: { x: 1, y: 0 }
            },
            {
                word: "moral",
                definition: "the significance of a story or event",
                isHorizontal: true,
                position: { x: 1, y: 3 }
            },
            {
                word: "acetic",
                definition: "relating to or containing acetic acid",
                isHorizontal: false,
                position: { x: 1, y: 9 }
            },
            {
                word: "pad",
                definition: "the foot or fleshy cushion-like underside of the toes of an animal",
                isHorizontal: true,
                position: { x: 2, y: 0 }
            },
            {
                word: "asp",
                definition: "cobra used by the Pharaohs as a symbol of their power over life and death",
                isHorizontal: true,
                position: { x: 3, y: 0 }
            },
            {
                word: "end",
                definition: "a position on the line of scrimmage",
                isHorizontal: false,
                position: { x: 3, y: 5 }
            },
            {
                word: "era",
                definition: "a major division of geological time; an era is usually divided into two or more \
                periods",
                isHorizontal: false,
                position: { x: 4, y: 3 }
            },
            {
                word: "lat",
                definition: "a broad flat muscle on either side of the back",
                isHorizontal: true,
                position: { x: 4, y: 7 }
            },
            {
                word: "afar",
                definition: "(old-fashioned) at or from or to a great distance; far",
                isHorizontal: true,
                position: { x: 5, y: 0 }
            },
            {
                word: "ace",
                definition: "a serve that the receiver is unable to reach",
                isHorizontal: false,
                position: { x: 5, y: 0 }
            },
            {
                word: "abbey",
                definition: "a monastery ruled by an abbot",
                isHorizontal: false,
                position: { x: 5, y: 2 }
            },
            {
                word: "bad",
                definition: "that which is below standard or expectations as of ethics or decency",
                isHorizontal: true,
                position: { x: 6, y: 2 }
            },
            {
                word: "able",
                definition: "(usually followed by `to') having the necessary means or skill or know-how or \
                authority to do something",
                isHorizontal: false,
                position: { x: 6, y: 6 }
            },
            {
                word: "ray",
                definition: "cartilaginous fishes having horizontally flattened bodies and enlarged winglike \
                pectoral fins with gills on the underside; most swim by moving the pectoral fins",
                isHorizontal: false,
                position: { x: 6, y: 8 }
            },
            {
                word: "lab",
                definition: "a workplace for the conduct of scientific research",
                isHorizontal: true,
                position: { x: 7, y: 4 }
            },
            {
                word: "bed",
                definition: "a piece of furniture that provides a place to sleep",
                isHorizontal: true,
                position: { x: 8, y: 1 }
            },
            {
                word: "any",
                definition: "to any degree or extent",
                isHorizontal: true,
                position: { x: 9, y: 0 }
            },
            {
                word: "sea",
                definition: "a division of an ocean or a large body of salt water partially enclosed by land",
                isHorizontal: true,
                position: { x: 9, y: 5 }
            }]
    }
};

describe("GridComponent", () => {
    let component: GridComponent;
    const inputService: InputService = new InputService();
    const defService: DefinitionService = new DefinitionService(crosswordService);

    beforeEach(() => {
        component = new GridComponent(
            crosswordService,
            inputService,
            defService
        );
        component.ngOnInit();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should validate word", () => {
        defService.SelectedWord = new Word("bacon", "", true, 0, 4);
        component.LetterGrid[0][4].Letter = "B";
        component.LetterGrid[0][5].Letter = "A";
        component.LetterGrid[0][6].Letter = "C";
        component.LetterGrid[0][7].Letter = "O";
        inputService.handleKey(78, 0, 8); // n

        expect(defService.SelectedWord.Word).toEqual("bacon");
        expect(defService.SelectedWord.IsPlaced).toEqual(true);
    });
});
