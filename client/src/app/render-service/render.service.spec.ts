import { TestBed, inject } from "@angular/core/testing";

import { RenderService } from "./render.service";
import { CarEventHandlerService } from "./car-event-handler.service";
import { CameraService } from "./camera.service";
import { SkyboxService } from "./skybox.service";
import { RenderTrackService } from "../render-track/render-track.service";

describe("RenderService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RenderService,
                CarEventHandlerService,
                CameraService,
                SkyboxService,
                RenderTrackService
            ]
        });
    });

    it("should be created", inject([RenderService], (service: RenderService) => {
        expect(service).toBeTruthy();
    }));
});
