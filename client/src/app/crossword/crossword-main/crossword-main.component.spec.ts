import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CrosswordMainComponent } from "./crossword-main.component";

describe("CrosswordMainComponent", () => {
  let component: CrosswordMainComponent;
  let fixture: ComponentFixture<CrosswordMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrosswordMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrosswordMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
