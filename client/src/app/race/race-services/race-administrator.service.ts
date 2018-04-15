import { Injectable } from "@angular/core";
import { BotCar } from "../car/bot-car";
import { Car } from "../car/car";
import { NUMBER_OF_LAPS } from "../../config";

const MEAN_CAR_SPEED: number = 40;  // TODO: POTENTIALLY TO MODIFY

@Injectable()
export class RaceAdministratorService {
    private isRaceOnGoing: boolean;
    private winners: { car: Car, time: number }[];
    public playersTime: Array<number> = [];

    public constructor() {
        this.winners = [];
        this.isRaceOnGoing = true;
    }

    public get IsWinnerDetermined(): boolean {
        return this.winners.length > 0;
    }

    public getPlayerLap(playerCar: Car): number {
        // TODO: Not really elegant, maybe find another way
        if (playerCar.carGPS === undefined) {
            return 0;
        }

        return playerCar.carGPS.currentLap;
    }

    public determineWinner(cars: Array<Car>): number {
        for (const car of cars) {
            if (car.carGPS.currentLap === NUMBER_OF_LAPS + 1) {
                this.isRaceOnGoing = false;
                this.determinePlayersTime(cars, car);

                return cars.indexOf(car);
            }
        }

        return -1;
    }

    public determinePlayersTime(cars: Array<Car>, winnerCar: Car): void {
        for (const car of cars) {
            if (car !== winnerCar) {
                const remTimeToCompSeg: number = Math.sqrt(Math.pow(car.mesh.position.z - car.carGPS.currentSegment.v2.x, 2) +
                    Math.pow(car.mesh.position.x - car.carGPS.currentSegment.v2.y, 2)) / MEAN_CAR_SPEED;
                let remTimeToCompLap: number = 0;
                for (let i: number = 1; i + car.carGPS.currentSegmentIndex < car.carGPS.NumberOfTrackSegments; i++) {
                    remTimeToCompLap += car.carGPS.trackSegments[i].getLength() / MEAN_CAR_SPEED;
                }
                const remainingLaps: number = NUMBER_OF_LAPS - car.carGPS.currentLap;
                const remainingSegments: number = remainingLaps * car.carGPS.trackSegments.length;
                let remTimeToCompRestOfRace: number = 0;
                for (let i: number = 0; i < remainingSegments; i++) {
                    remTimeToCompRestOfRace += car.carGPS.trackSegments[i % car.carGPS.NumberOfTrackSegments].getLength() / MEAN_CAR_SPEED;
                }
                this.playersTime.push(remTimeToCompSeg + remTimeToCompLap + remTimeToCompRestOfRace);
            } else {
                this.playersTime.push(0);
            }

        }
    }

    public addWinner(car: Car, time: number): void {
        for (const winnerCar of this.winners) {
            if (car.id === winnerCar.car.id) { return; }
        }
        this.winners.push({ car, time });
        console.log(`{car: ${car}, time: ${time}}`);
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
