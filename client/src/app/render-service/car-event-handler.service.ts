import { Car } from "../race/car/car";
import { PerspectiveCamera } from "three";
import { ZoomService } from "./zoom.service";
import { Injectable } from "@angular/core";

const ACCELERATE_KEYCODE: number = 87;  // w
const LEFT_KEYCODE: number = 65;        // a
const BRAKE_KEYCODE: number = 83;       // s
const RIGHT_KEYCODE: number = 68;       // d
const ZOOM_KEYCODE: number = 187;        // +
const UNZOOM_KEYCODE: number = 189;      // -

@Injectable()
export class CarEventHandlerService {
    public constructor(protected zoomService: ZoomService) {}

    public handleKeyDown(event: KeyboardEvent, _car: Car, camera: PerspectiveCamera): void {
        switch (event.keyCode) {
            case ACCELERATE_KEYCODE:
                _car.isAcceleratorPressed = true;
                break;
            case LEFT_KEYCODE:
                _car.steerLeft();
                break;
            case RIGHT_KEYCODE:
                _car.steerRight();
                break;
            case BRAKE_KEYCODE:
                _car.brake();
                break;
            case ZOOM_KEYCODE:
                this.zoomService.zoom(camera);
                break;
            case UNZOOM_KEYCODE:
                this.zoomService.unzoom(camera);
                break;
            default:
                break;
        }
    }

    public handleKeyUp(event: KeyboardEvent, _car: Car, camera: PerspectiveCamera): void {
        switch (event.keyCode) {
            case ACCELERATE_KEYCODE:
                _car.isAcceleratorPressed = false;
                break;
            case LEFT_KEYCODE:
            case RIGHT_KEYCODE:
                _car.releaseSteering();
                break;
            case BRAKE_KEYCODE:
                _car.releaseBrakes();
                break;
            default:
                break;
        }
    }
}
