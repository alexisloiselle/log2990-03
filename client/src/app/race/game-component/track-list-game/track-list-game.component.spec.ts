import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TrackListGameComponent } from "./track-list-game.component";
import { RenderService } from "../../../render-service/render.service";
import { CarEventHandlerService } from "../../../render-service/car-event-handler.service";
import { CameraService } from "../../../render-service/camera.service";
import { SkyboxService } from "../../../render-service/skybox.service";
import { CollisionService } from "../../collisions/collision.service";
import { TrackService } from "../../../track.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { RenderTrackService } from "../../../render-track/render-track.service";

describe("TrackListGameComponent", () => {
    let component: TrackListGameComponent;
    let fixture: ComponentFixture<TrackListGameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [TrackListGameComponent],
            providers: [
                TrackService,
                RenderService,
                CarEventHandlerService,
                CameraService,
                SkyboxService,
                CollisionService,
                RenderTrackService
            ]
        }).compileComponents()
        .catch((err) => {});
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackListGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
