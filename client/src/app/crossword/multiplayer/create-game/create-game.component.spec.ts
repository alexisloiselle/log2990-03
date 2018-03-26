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
});
