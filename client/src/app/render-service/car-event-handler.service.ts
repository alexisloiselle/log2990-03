// import { Injectable } from "@angular/core";
import { Car } from "../race/car/car";

const ACCELERATE_KEYCODE: number = 87;  // w
const LEFT_KEYCODE: number = 65;        // a
const BRAKE_KEYCODE: number = 83;       // s
const RIGHT_KEYCODE: number = 68;       // d

// @Injectable() WE DON'T NEED IT BECAUSE NOTHING IS INJECTED TO THIS SERVICE
export class CarEventHandlerService {
  public constructor() { }

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
          default:
              break;
      }
  }
}
