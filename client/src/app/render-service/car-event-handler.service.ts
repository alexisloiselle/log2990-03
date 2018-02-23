// import { Injectable } from "@angular/core";
import { Car } from "../race/car/car";
import { PerspectiveCamera } from "three";

const ACCELERATE_KEYCODE: number = 87;  // w
const LEFT_KEYCODE: number = 65;        // a
const BRAKE_KEYCODE: number = 83;       // s
const RIGHT_KEYCODE: number = 68;       // d
const ZOOM_KEYCODE: number = 88;         // x
const UNZOOM_KEYCODE: number = 90;       // z
const INITIAL_ZOOM_FACTOR: number = 1.03;
const ZOOM_FACTOR_INCREMENT: number = 0.01;
const ZOOM_LIMIT: number = 2;
const UNZOOM_LIMIT: number = 0.6;
let zoomFactor: number = INITIAL_ZOOM_FACTOR;
let unzoomFactor: number = INITIAL_ZOOM_FACTOR;

// @Injectable() WE DON'T NEED IT BECAUSE NOTHING IS INJECTED TO THIS SERVICE
export class CarEventHandlerService {
    public constructor() { }

    // tslint:disable-next-line:max-func-body-length
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
                if (camera.zoom < ZOOM_LIMIT) {
                    camera.zoom *= zoomFactor;
                    camera.updateProjectionMatrix();
                    zoomFactor += ZOOM_FACTOR_INCREMENT;
                }
                break;
            case UNZOOM_KEYCODE:
                if (camera.zoom > UNZOOM_LIMIT) {
                    camera.zoom /= unzoomFactor;
                    camera.updateProjectionMatrix();
                    unzoomFactor += ZOOM_FACTOR_INCREMENT;
                }
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
            case ZOOM_KEYCODE:
                zoomFactor = INITIAL_ZOOM_FACTOR;
                break;
            case UNZOOM_KEYCODE:
                unzoomFactor = INITIAL_ZOOM_FACTOR;
                break;
            default:
                break;
        }
    }
}
