import { SinglePlayerGameComponent } from "./single-player-game.component";
import { DefinitionService } from "../services/crossword/definition.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { Difficulty } from "../../../../../common/difficulty";
import { IFormattedGrid } from "../formatted-grid";
import { MOCK_LETTERS, MOCK_WORDS_AND_DEFS } from "../../../../../common/mock-constants";

const FORMATTED_GRID: IFormattedGrid = {
    letters: MOCK_LETTERS,
    words: MOCK_WORDS_AND_DEFS
};

// tslint:disable-next-line:no-any
const crosswordService: any = {
    generateGrid: () => {
        return FORMATTED_GRID;
    },
    FormattedGrid: FORMATTED_GRID
};
const defService: DefinitionService = new DefinitionService(crosswordService);

class MockActivatedRoute extends ActivatedRoute {
    public constructor() {
        super();
        this.params = Observable.of({
            difficulty: Difficulty.Mock
        });
    }
}

describe("SinglePlayerGameComponent", () => {
    let component: SinglePlayerGameComponent;

    beforeEach(() => {
        component = new SinglePlayerGameComponent(crosswordService, defService, new MockActivatedRoute(), null);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("isGridCompleted() should return false in the beginning of the game", async () => {
        await component.ngOnInit();
        expect(component.isGridCompleted()).toBeFalsy();
    });

    it("restardGame() should empty the current grid", () => {
        component.restartGame();
        expect(component.isGridCompleted()).toBeFalsy();
    });

    it("should be configured after ngoninit()", async () => {
        await component.ngOnInit();
        expect(component.isConfigured).toEqual(true);
        expect(component.difficulty).toEqual("mock");
        expect(defService.HorizontalWords).toBeTruthy();
        expect(defService.VerticalWords).toBeTruthy();
        expect(defService.HorizontalWords.length).not.toEqual(0);
        expect(defService.VerticalWords.length).not.toEqual(0);
    });
});
