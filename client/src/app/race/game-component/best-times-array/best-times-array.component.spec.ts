import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BestTimesArrayComponent } from "./best-times-array.component";

describe('BestTimesArrayComponent', () => {
    let component: BestTimesArrayComponent;
    let fixture: ComponentFixture<BestTimesArrayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BestTimesArrayComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BestTimesArrayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
