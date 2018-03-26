import { TestBed, inject } from "@angular/core/testing";
import { RenderTrackService } from "./render-track.service";

const NUMBEROFCARS: number = 4;

describe("RenderTrackService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenderTrackService]
    });
  });

  it("should be created", inject([RenderTrackService], (service: RenderTrackService) => {
    expect(service).toBeTruthy();
  }));

  it("should create a random array with numbers from 1 to 4", () => {
    const renderTrackService: RenderTrackService = new RenderTrackService();
    let positionNumbersOk: boolean = true;
    const positionNumbers1: Array<number> = renderTrackService.generateRandomCarPositions(NUMBEROFCARS);
    const positionNumbers2: Array<number> = renderTrackService.generateRandomCarPositions(NUMBEROFCARS);
    const positionNumbers3: Array<number> = renderTrackService.generateRandomCarPositions(NUMBEROFCARS);

    // We first check if the size of the arrays is correct
    if (positionNumbers1.length !== NUMBEROFCARS || positionNumbers2.length !== NUMBEROFCARS || positionNumbers3.length !== NUMBEROFCARS) {
      positionNumbersOk = false;
    }
    // Then we check if the numbers are in the correct range
    for (const n of positionNumbers1) {
      if (n > NUMBEROFCARS || n < 1) { positionNumbersOk = false; break; }
    }
    for (const n of positionNumbers2) {
      if (n > NUMBEROFCARS || n < 1) { positionNumbersOk = false; break; }
    }
    for (const n of positionNumbers3) {
      if (n > NUMBEROFCARS || n < 1) { positionNumbersOk = false; break; }
    }
    // Then we check if the function really generates aleatory numbers
    // With 3 arrays, there's almost no chance that the numbers will be the same
    for (let i: number = 0; i < positionNumbers1.length; i++) {
      if (positionNumbers1[i] === positionNumbers2[i] && positionNumbers1[i] === positionNumbers3[i] &&
          positionNumbers2[i] === positionNumbers3[i]) {
            positionNumbersOk = false;
      } else { break; }
    }

    expect(positionNumbersOk).toBe(true);
});
});
