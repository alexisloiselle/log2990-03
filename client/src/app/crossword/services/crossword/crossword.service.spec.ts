import { TestBed, inject } from "@angular/core/testing";
import { XHRBackend } from "@angular/http";

import { CrosswordService } from "./crossword.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockBackend } from "@angular/http/testing";

describe("CrosswordService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrosswordService,
                  { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  it("should be created", inject([CrosswordService], (service: CrosswordService) => {
    expect(service).toBeTruthy();
  }));
});
