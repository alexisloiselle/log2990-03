import { BotCar } from "./car/bot-car";
import { LineCurve, Vector2 } from "three";

export class BotsController {

    private botCars: Array<BotCar> = [];
    private trackSegments: Array<LineCurve> = [];
    private trackWidth: number;
    private currentSegmentIndex: number;

    public constructor(bots: Array<BotCar>, trackSegments: Array<LineCurve>, trackWidth: number) {
        this.botCars = bots;
        this.trackSegments = trackSegments;
        this.trackWidth = trackWidth;
    }

    public controlCars(): void {
        this.botCars.forEach((car: BotCar) => {
            this.controlCar(car);
        });
    }

    public controlCar(car: BotCar): void {
        this.trackSegments.forEach((segment: LineCurve) => {
            if (!this.reachedJonction(car.getPosition(), segment.v2)) {
                car.ajustDirection(segment);
            }
        });
    }

    public reachedJonction(carPosition: Vector2, jonctionPosition: Vector2): boolean {
        return carPosition.distanceTo(jonctionPosition) < this.trackWidth;
    }
}
