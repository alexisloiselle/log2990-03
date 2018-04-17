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

    it("should be a valid form if there is a username and a game name", () => {
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

    // TODO: Fix this test
    // const games: any = [{
    //     userName1: "blabla",
    //     userName2: "bblbllbl",
    //     gameName: "game naime",
    //     difficulty: "easy"
    // }];
    // const crosswordService: any = {
    //     Games: [{
    //         userName1: "blabla",
    //         userName2: "bblbllbl",
    //         gameName: "game naime",
    //         difficulty: "easy"
    //     }],
    //     getGames: () => {},
    //     updateMultiplayerGame: (user: string, game: string) => {},
    // };

    // const router: any = {
    //     navigateByUrl: () => {}
    // };

    // const socketService: any = {

    // };

    // const newComponent: JoinGameComponent = new JoinGameComponent(crosswordService, router, socketService);
    // newComponent.ngOnInit();

    // it("shoud refresh the game list", () => {
    //     expect(newComponent.games).toEqual([]);
    //     newComponent.refresh();
    //     expect(newComponent.games).toEqual(games);
    // });
});
