import { TestBed, inject } from "@angular/core/testing";
import { Router } from "@angular/router";

import { RenderService } from "./render.service";
import { CarEventHandlerService } from "./car-event-handler.service";
import { CameraService } from "./camera.service";
import { SkyboxService } from "./skybox.service";
import { RenderTrackService } from "../render-track/render-track.service";
import { CollisionService } from "../race/collisions/collision.service";
import { HudService } from "./hud.service";
import { RaceAdministratorService } from "../race/race-services/race-administrator.service";
import { SoundsService } from "./sounds.service";
import { TrackService } from "../track.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RenderService", () => {
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                RenderService,
                CarEventHandlerService,
                CameraService,
                SkyboxService,
                CollisionService,
                RenderTrackService,
                HudService,
                RaceAdministratorService,
                SoundsService,
                TrackService,
                { provide: Router, useClass: class { public navigate: jasmine.Spy = jasmine.createSpy("navigate"); } }
            ]
        });
    });

    it("should be created", inject([RenderService], (service: RenderService) => {
        expect(service).toBeTruthy();
    }));
});
