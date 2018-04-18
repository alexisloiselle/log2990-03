import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BestTimesArrayComponent } from "./best-times-array.component";
import { BestTimeService } from "./best-time.service";

describe("BestTimesArrayComponent", () => {
    let component: BestTimesArrayComponent;
    let fixture: ComponentFixture<BestTimesArrayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BestTimesArrayComponent, BestTimeService]
        })
        .compileComponents()
        .catch((err) => {});
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BestTimesArrayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
