import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import * as THREE from "three";
import { TrackService } from "./track.service";
import { RaceTrack, RaceType } from "./race/raceTrack";

describe("TrackService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrackService]
        });
    });

    it("should be created", inject([TrackService], (service: TrackService) => {
        expect(service).toBeTruthy();
    }));

    it("getTracks() should return an array of length > 0", inject([TrackService], async (service: TrackService) => {
        const tracks: RaceTrack[] = await service.getTracks();
        expect(tracks.length).toBeGreaterThan(0);
    }));

    it("addTrack() should return true", inject([TrackService], async (service: TrackService) => {
        const points: THREE.Vector2[] = [];
        const track: RaceTrack = new RaceTrack("lol", "test", "", RaceType.Amateur, points);
        const added: boolean = await service.addTrack(track);
        expect(added).toEqual(true);
    }));

    it("updateTrack() should return true", inject([TrackService], async (service: TrackService) => {
        const points: THREE.Vector2[] = [];
        const track: RaceTrack = new RaceTrack("lol", "test", "", RaceType.Amateur, points);
        const updated: boolean = await service.updateTrack(track);
        expect(updated).toEqual(true);
    }));

    it("updateTrack() should return true", inject([TrackService], async (service: TrackService) => {
        const points: THREE.Vector2[] = [];
        const track: RaceTrack = new RaceTrack("lol", "test", "", RaceType.Amateur, points);
        const updated: boolean = await service.updateTrack(track);
        expect(updated).toEqual(true);
    }));

    it("deleteTrack() should return true", inject([TrackService], async (service: TrackService) => {
        const updated: boolean = await service.deleteTrack("0");
        expect(updated).toEqual(true);
    }));
});
