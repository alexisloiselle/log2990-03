import { TestBed, inject } from "@angular/core/testing";

import { TrackService } from "./track.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RaceTrack } from "./race/raceTrack";

describe("TrackService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrackService,
        });
    });

    it("should be created", inject([TrackService], (service: TrackService) => {
        expect(service).toBeTruthy();
    }));

    describe("getTracks()", () => {
        it("should return ", inject([TrackService], async (service: TrackService) => {
            const tracks: RaceTrack[] = await service.getTracks();
            expect(tracks.length).toBeGreaterThan(0);
        }));
    });
});
