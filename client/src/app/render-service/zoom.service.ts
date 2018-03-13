import { PerspectiveCamera } from "three";
import { Injectable } from "@angular/core";

const INITIAL_ZOOM_FACTOR: number = 1.03;
const ZOOM_FACTOR_INCREMENT: number = 0.01;
const ZOOM_LIMIT: number = 2;
const UNZOOM_LIMIT: number = 0.6;

@Injectable()
export class ZoomService {

    public zoomFactor: number;
    public unzoomFactor: number;

    public constructor() {
        this.zoomFactor = INITIAL_ZOOM_FACTOR;
        this.unzoomFactor = INITIAL_ZOOM_FACTOR;
    }

    public zoom(camera: PerspectiveCamera): void {
        if (camera.zoom < ZOOM_LIMIT) {
            camera.zoom *= this.zoomFactor;
            camera.updateProjectionMatrix();
            this.zoomFactor += ZOOM_FACTOR_INCREMENT;
        }
    }

    public unzoom(camera: PerspectiveCamera): void {
        if (camera.zoom > UNZOOM_LIMIT) {
            camera.zoom /= this.unzoomFactor;
            camera.updateProjectionMatrix();
            this.unzoomFactor += ZOOM_FACTOR_INCREMENT;
        }
    }

}
