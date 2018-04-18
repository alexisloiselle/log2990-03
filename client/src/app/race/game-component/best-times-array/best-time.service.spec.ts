import { TestBed, inject } from "@angular/core/testing";

import { BestTimeService } from "./best-time.service";

describe("BestTimeService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BestTimeService]
        });
    });

    it("should be created", inject([BestTimeService], (service: BestTimeService) => {
        expect(service).toBeTruthy();
    }));
});
