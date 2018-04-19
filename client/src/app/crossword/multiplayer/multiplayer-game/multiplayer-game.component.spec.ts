import { MultiplayerGameComponent } from "./multiplayer-game.component";
import { MOCK_LETTERS, MOCK_WORDS_AND_DEFS } from "../../../../../../common/mock-constants";
import { Observable } from "rxjs/Observable";
import { IFormattedGrid } from "../../formatted-grid";
import { DefinitionService } from "../../services/crossword/definition.service";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "../../services/socket.service";

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

class MockActivatedRoute extends ActivatedRoute {
    public constructor() {
        super();
        this.params = Observable.of({
            gamename: "Test",
            isjoingame: true
        });
    }
}

const socketService: SocketService = new SocketService();
socketService.connect();

const defService: DefinitionService = new DefinitionService(crosswordService);

describe("MultiplayerGameComponent", () => {
    let component: MultiplayerGameComponent;

    beforeEach(() => {
        component = new MultiplayerGameComponent(crosswordService, defService, new MockActivatedRoute(), socketService, null);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("isGridCompleted() should return false in the beginning of the game", async () => {
        await component.ngOnInit();
        expect(component.isGameOver()).toBeFalsy();
    });

    it("restardGame() should empty the current grid", async () => {
        await component.rematch().catch((err) => {});
        expect(component.isGameOver()).toBeFalsy();
        expect(component.playerScore).toEqual(0);
        expect(component.opponentScore).toEqual(0);
    });

    it("should be configured after ngoninit()", async () => {
        await component.ngOnInit();
        expect(component.difficulty).toEqual("mock");
        expect(component.playerScore).toEqual(0);
        expect(component.opponentScore).toEqual(0);
        expect(defService.HorizontalWords).toBeTruthy();
        expect(defService.VerticalWords).toBeTruthy();
        expect(defService.HorizontalWords.length).not.toEqual(0);
        expect(defService.VerticalWords.length).not.toEqual(0);
    });
});
