import { Injectable } from "@angular/core";
import { BotCar } from "../car/bot-car";
import { Car } from "../car/car";
import { RaceTrack } from "../raceTrack";
import { Subject } from "rxjs/Subject";

// const PLAYERCAR: number = 0;
// const FIRSTBOTCAR: number = 1;
// const SECONDBOTCAR: number = 2;
// const THIRDBOTCAR: number = 3;

@Injectable()
export class RaceAdministratorService {
    private isRaceOnGoing: boolean;
    //private losersTime: Array<number> = [];
    private EndRaceSub: Subject<{track: RaceTrack}>;
    public constructor() {
        this.isRaceOnGoing = true;
    }

    /* RESPONSABILITÉS:
     * Retourne le lap auquel sont rendus les autos
     * Détermine lorsque la course commence et se termine
     * Simulation du temps des autres joueurs
     */
    public getEndRaceSub(): Observable<{track: RaceTrack}> {
        return this.EndRaceSub.asObservable();
    }

    public getPlayerLap(playerCar: Car): number {
        // Not really elegant, maybe find another way
        if (playerCar.carGPS === undefined) {
            return 0;
        }

        playerCar.carGPS.reachedJonction(playerCar.mesh);

        return playerCar.carGPS.currentLap;
    }

    public determineWinner(cars: Array<Car>): number {
        for (const car of cars) {
            if (car.carGPS.currentLap === 3) {
                this.isRaceOnGoing = false;
                console.log("car : " + cars.indexOf(car) + "won the race!");
                // appendchild criss
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
    }]
}
