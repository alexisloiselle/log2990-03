import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MultiplayerGameComponent } from "./multiplayer-game.component";

describe("MultiplayerGameComponent", () => {
  let component: MultiplayerGameComponent;
  let fixture: ComponentFixture<MultiplayerGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplayerGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplayerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
