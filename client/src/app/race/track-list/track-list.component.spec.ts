import { TrackListComponent } from "./track-list.component";
import {RenderService} from "../../render-service/render.service";
import {Router} from "@angular/router";

// to test
// tslint:disable-next-line:no-any
const trackService: any = {};

describe("TrackListComponent", () => {
    let component: TrackListComponent;
    let renderService: RenderService;
    let router: Router;

    beforeEach(() => {
        component = new TrackListComponent(trackService, renderService, router);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
