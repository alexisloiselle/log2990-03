import { TestBed, inject } from '@angular/core/testing';

import { TrackEditorConstraintService } from './track-editor-constraint.service';

describe('TrackEditorConstraintService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackEditorConstraintService]
    });
  });

  it('should be created', inject([TrackEditorConstraintService], (service: TrackEditorConstraintService) => {
    expect(service).toBeTruthy();
  }));
});
