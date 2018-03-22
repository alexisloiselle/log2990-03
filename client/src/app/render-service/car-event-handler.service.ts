import { Car } from "../race/car/car";
import { Injectable } from "@angular/core";
import { CameraService } from "./camera.service";

const ACCELERATE_KEYCODE: number = 87;  // w
const LEFT_KEYCODE: number = 65;        // a
const BRAKE_KEYCODE: number = 83;       // s
const RIGHT_KEYCODE: number = 68;       // d
const ZOOM_KEYCODE: number = 88;        // x
const UNZOOM_KEYCODE: number = 90;      // z
const SWITCH_VIEW_KEY: number = 86;     // v

@Injectable()
export class CarEventHandlerService {
    public constructor(protected cameraService: CameraService) {}

    public handleKeyDown(event: KeyboardEvent, _car: Car): void {
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
                this.cameraService.zoom(true);
                break;
            case UNZOOM_KEYCODE:
                this.cameraService.zoom(false);
                break;
            case SWITCH_VIEW_KEY:
                this.cameraService.switchView(_car);
                break;
            default:
                break;
        }
    }

    public handleKeyUp(event: KeyboardEvent, _car: Car): void {
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
            case UNZOOM_KEYCODE:
                this.cameraService.resetZoomFactor();
                break;
            case ZOOM_KEYCODE:
                this.cameraService.resetZoomFactor();
                break;
            default:
                break;
        }
    }
}
