import { CameraService } from "./camera.service";
import { SoundsService } from "./sounds.service";
import { ACCELERATE_SOUND } from "../config";
import { Car } from "../race/car/car";

// tslint:disable:max-classes-per-file
export abstract class Command {
    public abstract execute(keyDown: boolean, car?: Car): void;
}

export class AccelerateCommand extends Command {
    public constructor(private soundsService: SoundsService) {
        super();
    }

    public execute(keyDown: boolean, car: Car): void {
        if (keyDown) {
            car.isAcceleratorPressed = true;
            this.soundsService.playSound(ACCELERATE_SOUND);
        } else {
            car.isAcceleratorPressed = false;
        }
    }
}

export class SteerLeftCommand extends Command {
    public execute(keyDown: boolean, car: Car): void {
        keyDown ? car.steerLeft() : car.releaseSteering();
    }
}

export class SteerRightCommand extends Command {
    public execute(keyDown: boolean, car: Car): void {
        keyDown ? car.steerRight() : car.releaseSteering();
    }
}

export class BrakeCommand extends Command {
    public execute(keyDown: boolean, car: Car): void {
        keyDown ? car.brake() : car.releaseBrakes();
    }
}

export class ZoomCommand extends Command {
    public constructor(private cameraService: CameraService) {
        super();
    }

    public execute(keyDown: boolean): void {
        keyDown ? this.cameraService.zoom(true) : this.cameraService.resetZoomFactor();
    }
}

export class UnzoomCommand extends Command {
    public constructor(private cameraService: CameraService) {
        super();
    }

    public execute(keyDown: boolean): void {
        keyDown ? this.cameraService.zoom(false) : this.cameraService.resetZoomFactor();
    }
}

export class SwitchViewCommand extends Command {
    public constructor(private cameraService: CameraService) {
        super();
    }

    public execute(keyDown: boolean, car: Car): void {
        if (keyDown) {
            this.cameraService.switchView(car);
        }
    }
}