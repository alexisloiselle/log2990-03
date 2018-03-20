import { TestBed, inject } from "@angular/core/testing";

import { RenderTrackService } from "./render-track.service";

describe("RenderTrackService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenderTrackService]
    });
  });

  it("should be created", inject([RenderTrackService], (service: RenderTrackService) => {
    expect(service).toBeTruthy();
  }));
});
