import { BotCar } from "./car/bot-car";
import { LineCurve, Vector2 } from "three";

export class BotsController {

    private botCars: Array<BotCar> = [];
    private trackSegments: Array<LineCurve> = [];
    private trackWidth: number;
    private currentSegmentIndex: Array<number> = [];

    public constructor(bots: Array<BotCar>, trackSegments: Array<LineCurve>, trackWidth: number) {
        this.botCars = bots;
        this.trackSegments = trackSegments;
        this.trackWidth = trackWidth;
        this.botCars.forEach(() => {
            this.currentSegmentIndex.push(0);
        });
    }

    public controlCars(): void {
        for (let i: number = 0; i < this.botCars.length; i++) {
            const segment: LineCurve = this.trackSegments[this.currentSegmentIndex[i]];
            if (!this.reachedJonction(this.botCars[i].getPosition(), segment.v2)) {
                this.botCars[i].ajustDirection(segment);
            } else {
                this.currentSegmentIndex[i] = (this.currentSegmentIndex[i] + 1) % this.trackSegments.length;
            }
        }
    }

    public reachedJonction(carPosition: Vector2, jonctionPosition: Vector2): boolean {
        return carPosition.distanceTo(jonctionPosition) < this.trackWidth;
    }
}
