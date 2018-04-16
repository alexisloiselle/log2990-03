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

    // TODO: isFormValid tu peux le tester en hardcodant le username et le selectedGame

    // TODO: update username, tu peux l'appeler en hardcodant l'event aussi
    // let event: any = {
    //     target: {
    //         value: "new username"
    //     }
    // };

    // TODO: encore une fois, tu peux hardcoder pour tester le background color

    // TODO: pour les autres (refresh et joinGame), cest un peut plus tricky, faut injecter un crosswordService hardcoder
    // let crosswordService: any = {
    //     Games: [{
    //         userName1: "blabla",
    //         userName2: "bblbllbl",
    //         gameName: "game naime",
    //         difficulty: "easy"
    //     }],
    //     getGames: () => {},
    //     updateMultiplayerGame: (user: string, game: string) => {},
    //     // etc
    // };
    // Tu peux faire la meme chose avec le socketService et le router
});
