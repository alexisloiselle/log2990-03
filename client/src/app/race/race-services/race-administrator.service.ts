import { Injectable } from "@angular/core";
import { BotCar } from "../car/bot-car";
import { Car } from "../car/car";
import { NUMBER_OF_LAPS } from "../../config";

// const PLAYERCAR: number = 0;
// const FIRSTBOTCAR: number = 1;
// const SECONDBOTCAR: number = 2;
// const THIRDBOTCAR: number = 3;

@Injectable()
export class RaceAdministratorService {
    private isRaceOnGoing: boolean;

    public constructor() {
        this.isRaceOnGoing = true;
    }

    /* RESPONSABILITÉS:
     * Retourne le lap auquel sont rendus les autos
     * Détermine lorsque la course commence et se termine
     * Simulation du temps des autres joueurs
     */
    public getPlayerLap(playerCar: Car): number {
        // Not really elegant, maybe find another way
        if (playerCar.carGPS === undefined) {
            return 0;
        }

        return playerCar.carGPS.currentLap;
    }

    public determineWinner(cars: Array<Car>): number {
        for (const car of cars) {
            if (car.carGPS.currentLap === NUMBER_OF_LAPS) {
                this.isRaceOnGoing = false;
                // console.log("car : " + cars.indexOf(car) + "won the race!");

                return cars.indexOf(car);
            }
        }

        return -1;
    }

    public controlBots(botCars: Array<BotCar>): void {
        for (const car of botCars) {
            if (this.isRaceOnGoing) {
                car.go();
            } else {
                car.stop();
            }
        }
    }
}
