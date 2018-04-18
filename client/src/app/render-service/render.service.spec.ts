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
import { LineCurve } from "three";
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

    describe("player Lap (HUD)", () => {
        it("player lap should be initialized", inject([RenderService], (service: RenderService) => {
            service.car.initializeGPS(new Array<LineCurve>(), 0);
            // expect(service.playerLap).toEqual(1);
            // TODO: Yo... playerLap does not exist in rend service
        }));
        // TODO : test player lap update (event), if possible (all in reached junction, cant mock)
    });
});
