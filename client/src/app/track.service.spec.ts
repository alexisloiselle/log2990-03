import { TestBed, inject } from "@angular/core/testing";
import { XHRBackend } from "@angular/http";

import { TrackService } from "./track.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockBackend } from "@angular/http/testing";

describe("TrackService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrackService,
                        { provide: XHRBackend, useClass: MockBackend }]
        });
    });

    it("should be created", inject([TrackService], (service: TrackService) => {
        expect(service).toBeTruthy();
    }));
});
