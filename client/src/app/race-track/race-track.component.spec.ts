import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RaceTrackComponent} from "./race-track.component";

describe("RaceTrackComponent", () => {
  let fixture: ComponentFixture<RaceTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceTrackComponent);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
