import { async } from "@angular/core/testing";
import { RaceResultComponent } from "./race-result.component";

// tslint:disable:no-any
describe("RaceResultComponent", () => {
    let component: RaceResultComponent;
    const bestTimeService: any = {};
    const raceAdminService: any = {};

    beforeEach(async(() => {
        component = new RaceResultComponent(raceAdminService, bestTimeService);
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
