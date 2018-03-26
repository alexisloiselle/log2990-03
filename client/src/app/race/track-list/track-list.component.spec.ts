import { TrackListComponent } from "./track-list.component";
import { RenderService } from "../../render-service/render.service";
import { TrackService } from "../../track.service";
import { CanvasComponent } from "../track-editor/canvas/canvas.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { async } from "q";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CarEventHandlerService } from "../../render-service/car-event-handler.service";
import { CameraService } from "../../render-service/camera.service";
import { SkyboxService } from "../../render-service/skybox.service";
import { CollisionService } from "../collisions/collision.service";
import { RenderTrackService } from "../../render-track/render-track.service";

describe("TrackListComponent", () => {
    let component: TrackListComponent;
    let fixture: ComponentFixture<TrackListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [TrackListComponent, CanvasComponent],
            providers: [
                TrackService,
                RenderService,
                CarEventHandlerService,
                CameraService,
                SkyboxService,
                CollisionService,
                RenderTrackService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
