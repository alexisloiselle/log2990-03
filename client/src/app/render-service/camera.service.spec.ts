import { TestBed, inject } from "@angular/core/testing";
import {} from "jasmine";

import { CameraService } from "./camera.service";
import { RenderService } from "./render.service";
import { CarEventHandlerService } from "./car-event-handler.service";
import { SkyboxService } from "./skybox.service";
import { RenderTrackService } from "../render-track/render-track.service";

describe("CameraService", () => {
    let cameraService: CameraService;
    let renderService: RenderService;
    let carHandler: CarEventHandlerService;
    let skyboxService: SkyboxService;
    let renderTrackService: RenderTrackService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CameraService]
        });
        cameraService = new CameraService();
        skyboxService = new SkyboxService();
        renderTrackService = new RenderTrackService();
        carHandler = new CarEventHandlerService(cameraService);
        renderService = new RenderService(carHandler, cameraService,skyboxService, renderTrackService);
        renderService.initialize(document.createElement("div"));
    });

    it("should be created", inject([CameraService], (service: CameraService) => {
        expect(service).toBeTruthy();
    }));
});
