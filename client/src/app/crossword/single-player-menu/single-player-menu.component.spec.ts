import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SinglePlayerMenuComponent } from "./single-player-menu.component";

import { RouterTestingModule } from "@angular/router/testing";

describe("SinglePlayerMenuComponent", () => {
    let component: SinglePlayerMenuComponent;
    let fixture: ComponentFixture<SinglePlayerMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [SinglePlayerMenuComponent]
        })
        .compileComponents()
        .catch((err) => {});
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SinglePlayerMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
