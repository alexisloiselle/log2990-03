import { TestBed, inject } from "@angular/core/testing";

import { BestTimeService } from "./best-time.service";
import { TrackService } from "../../../track.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("BestTimeService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BestTimeService, TrackService]
        });
    });

    it("should be created", inject([BestTimeService], (service: BestTimeService) => {
        expect(service).toBeTruthy();
    }));
});
