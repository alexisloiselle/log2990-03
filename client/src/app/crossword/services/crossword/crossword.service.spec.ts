import { TestBed, inject } from "@angular/core/testing";
import { XHRBackend } from "@angular/http";

import { CrosswordService } from "./crossword.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("CrosswordService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrosswordService,
    });
  });

  it("should be created", inject([CrosswordService], (service: CrosswordService) => {
    expect(service).toBeTruthy();
  }));
});
