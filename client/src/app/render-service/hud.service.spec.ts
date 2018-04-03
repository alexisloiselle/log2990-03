import { TestBed, inject } from '@angular/core/testing';

import { HudService } from './hud.service';

describe('HudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HudService]
    });
  });

  it('should be created', inject([HudService], (service: HudService) => {
    expect(service).toBeTruthy();
  }));
});
