import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RaceResultComponent } from "./race-result.component";
import { RaceAdministratorService } from "../../race-services/race-administrator.service";
import { BestTimeService } from "../best-times-array/best-time.service";
import { TrackService } from "../../../track.service";
// import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RaceResultComponent", () => {
    let component: RaceResultComponent;
    let fixture: ComponentFixture<RaceResultComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            // imports: [HttpClientTestingModule],
            declarations: [RaceResultComponent],
            providers: [RaceAdministratorService,
                        BestTimeService,
                        TrackService]
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
