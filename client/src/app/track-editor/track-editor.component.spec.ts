import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TrackEditorComponent } from "./track-editor.component";

describe("TrackEditorComponent", () => {
  let component: TrackEditorComponent;
  let fixture: ComponentFixture<TrackEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should create", () => {
    expect(component).toBeTruthy();
  });
});
