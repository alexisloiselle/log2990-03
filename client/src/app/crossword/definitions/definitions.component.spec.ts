import { DefinitionsComponent } from "./definitions.component";
import { DefinitionService } from "../services/crossword/definition.service";
import { MOCK_LETTERS, MOCK_WORDS_AND_DEFS } from "../../../../../common/mock-constants";
import {Word} from "../word";

// tslint:disable-next-line:no-any
const crosswordService: any = {
    formattedGrid: {
        letters: MOCK_LETTERS,
        words: MOCK_WORDS_AND_DEFS
    }
};
const defService: DefinitionService = new DefinitionService(crosswordService);

describe("DefinitionsComponent", () => {
    let component: DefinitionsComponent;

    beforeEach(() => {
        component = new DefinitionsComponent(defService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it ("should find that the word is found by opponent",  () => {
        const word = new Word ("mot", "leMot", false, 0, 0);
        component.addOpponentFoundWord(word);
        expect(component.isWordFoundByOpponent(word)).toBeTruthy();
    });
});
