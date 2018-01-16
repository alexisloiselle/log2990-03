import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCreatorComponent } from './grid-creator.component';

describe('GridCreatorComponent', () => {
  let component: GridCreatorComponent;
  let fixture: ComponentFixture<GridCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
