import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CrosswordMainComponent } from "./crossword-main.component";

import { RouterTestingModule } from "@angular/router/testing";

describe("CrosswordMainComponent", () => {
    let component: CrosswordMainComponent;
    let fixture: ComponentFixture<CrosswordMainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [CrosswordMainComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrosswordMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
