import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RaceResultComponent } from "./race-result.component";
import { RaceAdministratorService } from "../../race-services/race-administrator.service";

describe("RaceResultComponent", () => {
    let component: RaceResultComponent;
    let fixture: ComponentFixture<RaceResultComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RaceResultComponent, RaceAdministratorService]
        })
            .compileComponents()
            .catch((err) => { });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RaceResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
