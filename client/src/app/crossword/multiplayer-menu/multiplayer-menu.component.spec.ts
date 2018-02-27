import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MultiplayerMenuComponent } from "./multiplayer-menu.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("MultiplayerMenuComponent", () => {
    let component: MultiplayerMenuComponent;
    let fixture: ComponentFixture<MultiplayerMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [MultiplayerMenuComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiplayerMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
