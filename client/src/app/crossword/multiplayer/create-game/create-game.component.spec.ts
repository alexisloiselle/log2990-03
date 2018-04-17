import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateGameComponent } from "./create-game.component";
import { RouterTestingModule } from "@angular/router/testing";
import { CrosswordService } from "../../services/crossword/crossword.service";
import { HttpClientModule } from "@angular/common/http";
import { SocketService } from "../../services/socket.service";

describe("CreateGameComponent", () => {
    let component: CreateGameComponent;
    let fixture: ComponentFixture<CreateGameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule],
            declarations: [CreateGameComponent],
            providers: [CrosswordService, SocketService]
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

    // TODO: comme jai dit pour le join game, mock l'event
    // TODO: createGame tu dois mock socketService, crosswordService et router comme jai expliquer dans join game
});
