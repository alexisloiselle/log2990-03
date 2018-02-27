import { TestBed, inject } from "@angular/core/testing";

import { RenderService } from "./render.service";
import { CarEventHandlerService } from "./car-event-handler.service";

describe("RenderService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RenderService, CarEventHandlerService]
        });
    });

    it("should be created", inject([RenderService], (service: RenderService) => {
         expect(service).toBeTruthy();
    }));
});
