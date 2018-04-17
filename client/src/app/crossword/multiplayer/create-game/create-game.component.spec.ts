import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateGameComponent } from "./create-game.component";
import { RouterTestingModule } from "@angular/router/testing";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { HttpClientModule } from "@angular/common/http";
import { SocketService } from "../../services/socket.service";

describe("CreateGameComponent", () => {
    // tslint:disable:no-any
    let component: CreateGameComponent;
    let fixture: ComponentFixture<CreateGameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule],
            declarations: [CreateGameComponent],
            providers: [CrosswordService,
                        SocketService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should update username when there is a name update", () => {
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

    it("should update game name when there is a game name update", () => {
        const newGameName: string = "new game name";
        // tslint:disable-next-line:no-any
        const event: any = {
            target: {
                value: newGameName
            }
        };
        component.updateGameName(event);
        expect(component.gameName).toEqual(newGameName);
    });

    it("should not be a valid form if there is no game name", () => {
        component.gameName = "";
        component.username = "username";
        component.difficulty = "test";
        component.isCreateGameAlreadyClicked = false;
        expect(component.isFormValid()).toBeFalsy();
    });

    it("should not be a valid form if there is no username", () => {
        component.gameName = "gameName";
        component.username = "";
        component.difficulty = "test";
        component.isCreateGameAlreadyClicked = false;
        expect(component.isFormValid()).toBeFalsy();
    });

    it("should not be a valid form if there is no game difficulty", () => {
        component.gameName = "gameName";
        component.username = "username";
        component.difficulty = "";
        component.isCreateGameAlreadyClicked = false;
        expect(component.isFormValid()).toBeFalsy();
    });

    it("should not be a valid form if the create button has been already clicked", () => {
        component.gameName = "gameName";
        component.username = "username";
        component.difficulty = "test";
        component.isCreateGameAlreadyClicked = true;
        expect(component.isFormValid()).toBeFalsy();
    });

    it("should be a valid form if there is a game name, a username, a difficulty and it hasn't been clicked yet", () => {
        component.gameName = "gameName";
        component.username = "username";
        component.difficulty = "test";
        component.isCreateGameAlreadyClicked = false;
        expect(component.isFormValid()).toBeTruthy();
    });

    const router: any = {
        navigate: (url: [string, string, boolean]) => {}
    };

    const crosswordServise: any = {
        isNameAlreadyUsed: async (gameName: string): Promise<boolean> => {
            if (gameName === "alreadyUsed") {
                return true;
            } else {
                return false;
            }
        },
        createGame: async (gameName: string) => {}
    };

    const socketService: any = {
        connect: () => {},
        newGame: (gameName: string, username: string) => {}
    };

    const newComponent: CreateGameComponent = new CreateGameComponent(router, crosswordServise, socketService);
    newComponent.ngOnInit();

    it("should be able to click on create game when name is already used", async () => {
        newComponent.gameName = "alreadyUsed";
        await newComponent.createGame();
        expect(newComponent.isCreateGameAlreadyClicked).toEqual(false);
    });

    it("should be able to click on create game again when name is not already used", async () => {
        newComponent.gameName = "isNotAlreadyUsed";
        await newComponent.createGame();
        expect(newComponent.isCreateGameAlreadyClicked).toEqual(true);
    });
});
