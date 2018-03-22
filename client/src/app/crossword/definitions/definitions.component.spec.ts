import { DefinitionsComponent } from "./definitions.component";
import { DefinitionService } from "../services/crossword/definition.service";
import { MOCK_LETTERS, MOCK_WORDS_AND_DEFS } from "../../../../../common/mock-constants";

// to test
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
});
