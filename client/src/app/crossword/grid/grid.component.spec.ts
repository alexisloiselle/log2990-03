import { GridComponent } from "./grid.component";
import { InputService } from "../services/crossword/input.service";
import { DefinitionService } from "../services/crossword/definition.service";
import { Word } from "../word";
import { MOCK_LETTERS, MOCK_WORDS_AND_DEFS } from "../../../../../common/mock-constants";

// to test
// tslint:disable:no-magic-numbers
// tslint:disable-next-line:no-any
const crosswordService: any = {
    formattedGrid: {
        letters: MOCK_LETTERS,
        words: MOCK_WORDS_AND_DEFS
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
