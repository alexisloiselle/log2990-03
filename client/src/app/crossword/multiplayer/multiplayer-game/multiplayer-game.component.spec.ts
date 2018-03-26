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

const defService: DefinitionService = new DefinitionService(crosswordService);

describe("MultiplayerGameComponent", () => {
    let component: MultiplayerGameComponent;

    beforeEach(() => {
        component = new MultiplayerGameComponent(crosswordService, defService, new MockActivatedRoute(), socketService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
