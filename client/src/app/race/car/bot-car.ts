import { Car } from "./car";

export class BotCar extends Car {
    public start(): void {
        this.isAcceleratorPressed = true;
        this.steerLeft();
    }
}
