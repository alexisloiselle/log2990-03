import { TestBed, inject } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("AuthService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
  });

  it("should be created", inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  describe("connect()", () => {

    it("should return ", () => {
        expect(null).toEqual(null);
    });
  });
  describe("changePassword()", () => {

    it("should return ", () => {
        expect(null).toEqual(null);
    });
  });
  describe("disconnect()", () => {

    it("should return ", () => {
        expect(null).toEqual(null);
    });
  });
});
