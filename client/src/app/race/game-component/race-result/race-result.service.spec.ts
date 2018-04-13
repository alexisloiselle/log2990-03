import { TestBed, inject } from "@angular/core/testing";

import { RaceResultService } from "./race-result.service";

describe("RaceResultService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaceResultService]
    });
  });

  it("should be created", inject([RaceResultService], (service: RaceResultService) => {
    expect(service).toBeTruthy();
  }));
});
