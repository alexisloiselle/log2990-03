import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RaceMainComponent } from "./race-main.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("RaceMainComponent", () => {
    let component: RaceMainComponent;
    let fixture: ComponentFixture<RaceMainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [RaceMainComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RaceMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
