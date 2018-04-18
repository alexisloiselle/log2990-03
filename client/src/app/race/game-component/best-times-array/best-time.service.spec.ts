import { TestBed, inject } from "@angular/core/testing";

import { BestTimeService } from "./best-time.service";
import { TrackService } from "../../../track.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RaceTrack, RaceType, Player } from "../../raceTrack";
import { Vector2 } from "three";

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

    describe("Initialize IsTimeBeaten", () => {
        const type: RaceType = 1;
        const player: Player = {name: "1", time: 10 };
        const point: Vector2[] = [];
        const track: RaceTrack = new RaceTrack("1", "race1", "allo", type, point);
        const time: number = 20;
        track.bestTimes.push(player);
        it("should be true ", inject([BestTimeService], async (service: BestTimeService)  => {
            service.initialize(track, time).catch((err) => {});
            expect(service.IsTimeBeaten).toEqual(true);
        }));

        it("should initialize track ", inject([BestTimeService], async (service: BestTimeService)  => {
        const bestTimes: Array<Player> = new Array(
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 },
            { name: "N/A", time: -1 });
        track.bestTimes = bestTimes;
        service.initialize(track, time).catch((err) => {});
        expect(service.BestTimesArray).toEqual(bestTimes);
        }));

    });

    describe("checkTime", () => {
        const type: RaceType = 1;
        const point: Vector2[] = [];
        const time: number = 1;
        const time1: number = 100;
        const bestTimes: Array<Player> = new Array(
            { name: "Henri", time: 10 },
            { name: "Alexis", time: 15 },
            { name: "Lexi", time: 20 },
            { name: "Al", time: 25 },
            { name: "Xie", time: 30 });
        const track: RaceTrack = new RaceTrack("1", "race1", "allo", type, point, bestTimes);
        it("should be true", inject([BestTimeService], (service: BestTimeService)  => {
            service.initialize(track, time).catch((err) => {});
            expect(service.IsTimeBeaten).toEqual(true);
        }));

        it("should be false", inject([BestTimeService], (service: BestTimeService)  => {
            service.initialize(track, time1).catch((err) => {});
            expect(service.IsTimeBeaten).toEqual(false);
        }));

    });

    describe("postNewBestTime", () => {

        it(" ", inject([BestTimeService], async (service: BestTimeService, service1: TrackService)  => {
        const type: RaceType = 1;
        const point: Vector2[] = [];
        const time: number = 1;
        const bestTimes: Array<Player> = new Array(
            { name: "Henri", time: 10 },
            { name: "Alexis", time: 15 },
            { name: "Lexi", time: 20 },
            { name: "Al", time: 25 },
            { name: "Xie", time: 30 });
        const track: RaceTrack = new RaceTrack("1", "race1", "allo", type, point, bestTimes);
        service.initialize(track, time).catch((err) => {});
        service.postNewBestTime("MIGLI THE KING").catch((err) => {});
        expect(service.BestTimesArray[0].name).toEqual("MIGLI THE KING");
        expect(service.IsPostDone).toEqual(true);

        }));

    });
});
