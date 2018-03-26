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
            if (this.reachedJonction(this.botCars[i].getPosition(),
                                     this.trackSegments[this.currentSegmentIndex[i]].v2)) {
                this.currentSegmentIndex[i] = (this.currentSegmentIndex[i] + 1) % (this.trackSegments.length);
                this.botCars[i].ajustDirection(this.trackSegments[this.currentSegmentIndex[i]], false);
            } else {
                this.botCars[i].ajustDirection(this.trackSegments[this.currentSegmentIndex[i]], true);
            }
        }
    }

    public reachedJonction(carPosition: Vector2, jonctionPosition: Vector2): boolean {
        const factor: number = 0.8;

        return carPosition.distanceTo(jonctionPosition) < (this.trackWidth * factor);
    }
}
