import { BotCar } from "./car/bot-car";
import { RaceTrack } from "./raceTrack";

export class BotsController {

    private raceTrack: RaceTrack;
    private botCars: Array<BotCar> = new Array();

    public constructor(bots: Array<BotCar>, raceTrack: RaceTrack) {
        this.botCars = bots;
        this.raceTrack = raceTrack;
    }

    public controlCars(): void {
        this.botCars.forEach((car: BotCar) => {

        });
    }
}
