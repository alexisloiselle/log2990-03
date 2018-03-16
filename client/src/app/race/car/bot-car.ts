import { Car } from "./car";

export class BotCar extends Car {
    public start(): void {
        this.isAcceleratorPressed = true;
        this.steerLeft();
    }

    public start2(): void {
        this.isAcceleratorPressed = true;
        this.steerRight();
    }
}
