import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomepageComponent } from "./homepage.component";

describe("MainPageComponent", () => {
    let component: HomepageComponent;
    let fixture: ComponentFixture<HomepageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomepageComponent]
        })
        .compileComponents()
        .catch((err) => {});
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
