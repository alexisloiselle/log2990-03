import { TestBed, inject } from '@angular/core/testing';

import { CarPositionService } from './car-position.service';

describe('CarPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarPositionService]
    });
  });

  it('should be created', inject([CarPositionService], (service: CarPositionService) => {
    expect(service).toBeTruthy();
  }));
});
