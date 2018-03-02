import { TestBed, inject } from '@angular/core/testing';

import { ObstaclesService } from './obstacles.service';

describe('ObstaclesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObstaclesService]
    });
  });

  it('should be created', inject([ObstaclesService], (service: ObstaclesService) => {
    expect(service).toBeTruthy();
  }));
});
