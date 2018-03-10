import { Car } from "./car";

export class BotCar extends Car {
    public startAccelerating(): void {
        this.isAcceleratorPressed = true;
    }

    public turn(): void {
        this.steerLeft();
    }
}
