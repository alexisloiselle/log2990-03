import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RaceMainComponent } from "./race-main.component";

describe("RaceMainComponent", () => {
  let component: RaceMainComponent;
  let fixture: ComponentFixture<RaceMainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RaceMainComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RaceMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
