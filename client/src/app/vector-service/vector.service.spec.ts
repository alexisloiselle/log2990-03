import { TestBed, inject } from '@angular/core/testing';

import { VectorService } from './vector.service';

describe('VectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VectorService]
    });
  });

  it('should be created', inject([VectorService], (service: VectorService) => {
    expect(service).toBeTruthy();
  }));
});
