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
        this.normaliseSegment();
        this.trackWidth = trackWidth;
        this.botCars.forEach(() => {
            this.currentSegmentIndex.push(0);
        });
    }

    public controlCars(): void {
        const changeSegment: boolean[] = [false, false, false];

        for (let i: number = 0; i < this.botCars.length; i++) {
            const segment: LineCurve = this.trackSegments[this.currentSegmentIndex[i]];
            if (this.reachedJonction(this.botCars[i].getPosition(), segment.v2) || changeSegment[i]) {
                changeSegment[i] = true;
                this.botCars[i].changeSegment(this.trackSegments[this.currentSegmentIndex[i] + 1]);

                if (this.botCars[i].isDirectionOnSegment(this.trackSegments[this.currentSegmentIndex[i] + 1])) {
                    changeSegment[i] = false;
                    this.currentSegmentIndex[i] = (this.currentSegmentIndex[i] + 1) % this.trackSegments.length;
                }
            } else {
                changeSegment[i] = false;
                this.botCars[i].ajustDirection(segment);
            }
        }
    }

    public normaliseSegment(): void {
        const x: number = this.trackSegments[0].v1.x;
        const y: number = this.trackSegments[0].v1.y;
        for (const segment of this.trackSegments) {
            segment.v1.x = segment.v1.x - x;
            segment.v1.y = segment.v1.y - y;
        }
        this.trackSegments[this.trackSegments.length - 1].v2.x = this.trackSegments[this.trackSegments.length - 1].v2.x - x;
        this.trackSegments[this.trackSegments.length - 1].v2.y = this.trackSegments[this.trackSegments.length - 1].v2.y - y;
    }

    public reachedJonction(carPosition: Vector2, jonctionPosition: Vector2): boolean {
        return carPosition.distanceTo(jonctionPosition) < this.trackWidth;
    }
}
