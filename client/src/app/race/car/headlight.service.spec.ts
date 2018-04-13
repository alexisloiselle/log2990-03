import { TestBed, inject } from "@angular/core/testing";

import { HeadlightService } from "./headlight.service";

describe("HeadlightService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HeadlightService]
        });
    });

    it("should be created", inject([HeadlightService], (service: HeadlightService) => {
        expect(service).toBeTruthy();
    }));
});
