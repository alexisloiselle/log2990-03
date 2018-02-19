// import { Injectable } from "@angular/core";
import { Car } from "../race/car/car";
import { PerspectiveCamera } from "three";

const ACCELERATE_KEYCODE: number = 87;  // w
const LEFT_KEYCODE: number = 65;        // a
const BRAKE_KEYCODE: number = 83;       // s
const RIGHT_KEYCODE: number = 68;       // d
const ZOOM_KEYCODE: number = 88;         // z
const UNZOOM_KEYCODE: number = 90;       // x
const ZOOM_FACTOR: number = 1.03;        // 


// @Injectable() WE DON'T NEED IT BECAUSE NOTHING IS INJECTED TO THIS SERVICE
export class CarEventHandlerService {
  public constructor() { }

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
            if (camera.position.y > 5) {
                camera.position.y = camera.position.y / ZOOM_FACTOR;
            }
            break;
        case UNZOOM_KEYCODE:
            if (camera.position.y < 60) {
                camera.position.y = camera.position.y * ZOOM_FACTOR;
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
          default:
              break;
      }
  }
}
