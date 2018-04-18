import { Car } from "../race/car/car";
import { Injectable } from "@angular/core";
import { CameraService } from "./camera.service";
import { SoundsService } from "./sounds.service";
import {
    CarCommand,
    AccelerateCommand,
    SteerLeftCommand,
    SteerRightCommand,
    BrakeCommand,
    ZoomCommand,
    UnzoomCommand,
    SwitchViewCommand
} from "./car-event-handler-command";

const ACCELERATE_KEYCODE: number = 87;  // w
const LEFT_KEYCODE: number = 65;        // a
const RIGHT_KEYCODE: number = 68;       // d
const BRAKE_KEYCODE: number = 83;       // s
const ZOOM_KEYCODE: number = 187;        // +
const UNZOOM_KEYCODE: number = 189;      // -
const SWITCH_VIEW_KEY: number = 67;    // c
const NIGHT_KEY: number = 78;       // n

@Injectable()
export class CarEventHandlerService {
    private keyMap: Map<number, CarCommand>;

    public constructor(
        protected cameraService: CameraService,
        protected soundsService: SoundsService
    ) {
        this.keyMap = new Map<number, CarCommand>([
            [ACCELERATE_KEYCODE, new AccelerateCommand(this.soundsService)],
            [LEFT_KEYCODE, new SteerLeftCommand()],
            [RIGHT_KEYCODE, new SteerRightCommand()],
            [BRAKE_KEYCODE, new BrakeCommand()],
            [ZOOM_KEYCODE, new ZoomCommand(this.cameraService)],
            [UNZOOM_KEYCODE, new UnzoomCommand(this.cameraService)],
            [SWITCH_VIEW_KEY, new SwitchViewCommand(this.cameraService)]
        ]);
    }

    public handleKeyDown(event: KeyboardEvent, _car: Car): void {
        const command: CarCommand = this.keyMap.get(event.keyCode);
        if (command !== undefined && event.keyCode !== NIGHT_KEY) {
            command.execute(true, _car);
        }
    }

    public handleKeyUp(event: KeyboardEvent, _car: Car): boolean {
        if (event.keyCode === NIGHT_KEY) {
            return true;
        }
        const command: CarCommand = this.keyMap.get(event.keyCode);
        if (command !== undefined) {
            command.execute(false, _car);
        }

        return false;
    }
}
