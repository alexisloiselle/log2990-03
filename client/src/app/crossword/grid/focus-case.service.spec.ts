import { TestBed, inject } from '@angular/core/testing';

import { FocusCaseService } from './focus-case.service';

describe('FocusCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FocusCaseService]
    });
  });

  it('should be created', inject([FocusCaseService], (service: FocusCaseService) => {
    expect(service).toBeTruthy();
  }));
});
