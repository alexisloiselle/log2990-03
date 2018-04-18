import { async } from "@angular/core/testing";
import { BestTimesArrayComponent } from "./best-times-array.component";

// tslint:disable:no-any
describe("BestTimesArrayComponent", () => {
    let component: BestTimesArrayComponent;
    const bestTimeService: any = {};

    beforeEach(async(() => {
        component = new BestTimesArrayComponent(bestTimeService);
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
