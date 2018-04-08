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
import { LineCurve, Object3D } from "three";
import { Subject } from "rxjs/Subject";

describe("RenderService", () => {
    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                RenderService,
                CarEventHandlerService,
                CameraService,
                SkyboxService,
                CollisionService,
                RenderTrackService,
                HudService,
                RaceAdministratorService,
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
            expect(service.playerLap).toEqual(1);
        }));
        // TODO : test player lap update (event), if possible (all in reached junction, cant mock)
    });
});
