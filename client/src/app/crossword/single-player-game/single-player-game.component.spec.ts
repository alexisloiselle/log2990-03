import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SinglePlayerGameComponent } from "./single-player-game.component";

import { RouterTestingModule } from "@angular/router/testing";

describe("SinglePlayerGameComponent", () => {
    let component: SinglePlayerGameComponent;
    let fixture: ComponentFixture<SinglePlayerGameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [SinglePlayerGameComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SinglePlayerGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
