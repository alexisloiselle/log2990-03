import { TestBed, inject } from "@angular/core/testing";
import { RenderTrackService } from "./render-track.service";
import { TrackService } from "../track.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

const NUMBER_OF_CARS: number = 4;

describe("RenderTrackService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [RenderTrackService, TrackService]
        });
    });

    it("should be created", inject([RenderTrackService], (service: RenderTrackService) => {
        expect(service).toBeTruthy();
    }));

    it("should create a random array with numbers from 1 to 4", () => {
        const renderTrackService: RenderTrackService = new RenderTrackService(null);
        const positionNumbers: Array<number> = renderTrackService.generateRandomCarPositions(NUMBER_OF_CARS);

        // We first check if the size of the arrays is correct
        let positionNumbersOk: boolean = positionNumbers.length === NUMBER_OF_CARS;

        // Then we check if the numbers are in the correct range
        for (const n of positionNumbers) {
            if (n > NUMBER_OF_CARS || n < 1) {
                positionNumbersOk = false;
                break;
            }
        }

        expect(positionNumbersOk).toBe(true);
    });
});
