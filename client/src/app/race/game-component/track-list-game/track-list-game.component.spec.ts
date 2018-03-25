import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackListGameComponent } from './track-list-game.component';

describe('TrackListGameComponent', () => {
  let component: TrackListGameComponent;
  let fixture: ComponentFixture<TrackListGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackListGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackListGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
