import { TestBed, inject } from "@angular/core/testing";
import { HudService } from "./hud.service";

// tslint:disable:no-magic-numbers
describe("HudService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HudService]
        });
    });

    it("should be created", inject([HudService], (service: HudService) => {
        expect(service).toBeTruthy();
    }));

    describe("should initialize", () => {
        it("lap time should be at 0", inject([HudService], (service: HudService) => {
            service.initialize();
            expect(service.lapTime).toEqual(0);
        }));

        it("race time should be at 0", inject([HudService], (service: HudService) => {
            service.initialize();
            expect(service.raceTime).toEqual(0);
        }));
    });

    describe("should update", () => {
        it("both times should change after update", inject([HudService], async (service: HudService) => {
            service.initialize();
            await new Promise((resolve: Function) => setTimeout(resolve, 100));
            service.update();
            expect(service.lapTime).not.toEqual(0);
            expect(service.raceTime).not.toEqual(0);
        }));

        it("lap time should be 0 when lap finishes", inject([HudService], async (service: HudService) => {
            service.initialize();
            await new Promise((resolve: Function) => setTimeout(resolve, 100));
            service.update();
            service.finishLap();
            expect(service.lapTime).toEqual(0);
        }));
    });
});
