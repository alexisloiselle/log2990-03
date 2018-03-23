import { Car } from "./car";

export class BotCar extends Car {

    public turnLeft(): void {
        this.isAcceleratorPressed = true;
        this.steerLeft();
    }

    public turnRight(): void {
        this.isAcceleratorPressed = true;
        this.steerRight();
    }
}
