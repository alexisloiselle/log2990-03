import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { JoinGameComponent } from "./join-game.component";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { SocketService } from "../../services/socket.service";

describe("JoinGameComponent", () => {
    let component: JoinGameComponent;
    let fixture: ComponentFixture<JoinGameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule],
            declarations: [JoinGameComponent],
            providers: [CrosswordService, SocketService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JoinGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should not be a valid form if there is no username", () => {
        component.username = "";
        component.selectedGame = "gameName";
        expect(component.isFormValid()).toBeFalsy();
    });

    it("should not be a valid form if there is no game name", () => {
        component.username = "username";
        component.selectedGame = "";
        expect(component.isFormValid()).toBeFalsy();
    });

    it("should not be a valid form if there is no username and no game name", () => {
        component.username = "";
        component.selectedGame = "";
        expect(component.isFormValid()).toBeFalsy();
    });

    it("should be a valid form if there is a username and a game name", () => {
        component.username = "username";
        component.selectedGame = "gameName";
        expect(component.isFormValid()).toBeTruthy();
    });

    it("background should be gray if it's the selected game", () => {
        component.selectedGame = "selectedGame";
        expect(component.getBackgroundColor("selectedGame")).toEqual("lightgray");
    });

    it("background should be gray if it's the selected game", () => {
        component.selectedGame = "selectedGame";
        expect(component.getBackgroundColor("notTheSelectedGame")).toEqual("white");
    });

    it("should update username when there is a new name update", () => {
        const newUsername: string = "new username";
        // tslint:disable-next-line:no-any
        const event: any = {
            target: {
                value: newUsername
            }
        };
        component.updateUsername(event);
        expect(component.username).toEqual(newUsername);
    });

    const crosswordService: any = {
        Games: [{}],
        getGames: async () => { crosswordService.Games =  [{
            userName1: "blabla",
            userName2: "bblbllbl",
            gameName: "game naime",
            difficulty: "easy"
        }]; },
        updateMultiplayerGame: (user: string, game: string) => {},
    };

    const router: any = {
        navigateByUrl: () => {}
    };

    const socketService: any = {

    };

    const newComponent: JoinGameComponent = new JoinGameComponent(crosswordService, router, socketService);
    newComponent.ngOnInit();

    it("shoud refresh the game list", async () => {
        expect(newComponent.games).toEqual([]);
        await newComponent.refresh();
        expect(newComponent.games).toEqual([{
            userName1: "blabla",
            userName2: "bblbllbl",
            gameName: "game naime",
            difficulty: "easy"
        }]);
    });
});
