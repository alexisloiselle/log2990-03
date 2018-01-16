import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordPlacerComponent } from './word-placer.component';

describe('WordPlacerComponent', () => {
  let component: WordPlacerComponent;
  let fixture: ComponentFixture<WordPlacerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordPlacerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordPlacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
