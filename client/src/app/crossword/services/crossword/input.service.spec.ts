import { TestBed, inject } from "@angular/core/testing";

import { InputService } from "./input.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

// disable magic-numbers to test
// tslint:disable:no-magic-numbers
describe("InputService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InputService]
    });
  });

  it("should be created", inject([InputService], (service: InputService) => {
    expect(service).toBeTruthy();
  }));

  it("should not be accepted to enter a non-letter input", inject([InputService], (service: InputService) => {
    expect(service.handleKey(49, 0, 0)).toEqual(false); // 1
    expect(service.handleKey(188, 0, 0)).toEqual(false); // comma
    expect(service.handleKey(189, 0, 0)).toEqual(false); // dash
    expect(service.handleKey(220, 0, 0)).toEqual(false); // backslash

    expect(service.handleKey(8, 0, 0)).toEqual(true); // backspace
    expect(service.handleKey(13, 0, 0)).toEqual(true); // enter
    expect(service.handleKey(40, 0, 0)).toEqual(true); // down
    expect(service.handleKey(65, 0, 0)).toEqual(true); // a
  }));

});
