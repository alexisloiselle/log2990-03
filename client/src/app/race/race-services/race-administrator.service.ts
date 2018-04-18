import { Injectable } from "@angular/core";
import { BotCar } from "../car/bot-car";
import { Car } from "../car/car";
import { NUMBER_OF_LAPS } from "../../config";

export interface RemainingRace {
    remTimeToCompRestOfRace: number;
    remTimeToCompLap: number;
    remTimeToCompSeg: number;
    remainingLaps: number;
    remainingSegments: number;
    currentLap: number;

}
@Injectable()
export class RaceAdministratorService {
    private isRaceOnGoing: boolean;
    public carsLapsTime: { id: number, lapsTime: number[] }[] = [];
    public remainingRace: RemainingRace = {
        remainingLaps: 0,
        remainingSegments: 0,
        remTimeToCompLap: 0,
        remTimeToCompRestOfRace: 0,
        remTimeToCompSeg: 0,
        currentLap: 0
    };

    public constructor() {
        this.isRaceOnGoing = true;
    }

    public initializeCarsLapsTime(cars: Car[]): void {
        for (const car of cars) {
            const lapsTime: number[] = [];
            for (let j: number = 0; j < NUMBER_OF_LAPS; j++) {
                lapsTime.push(0);
            }
            this.carsLapsTime.push({ id: car.id, lapsTime });
        }
    }

    public getCarLap(playerCar: Car): number {
        return playerCar.carGPS === undefined ? 0 : playerCar.carGPS.currentLap;
    }

    public determineWinner(cars: Array<Car>): number {
        for (const car of cars) {
            if (car.carGPS.currentLap === NUMBER_OF_LAPS + 1) {
                this.isRaceOnGoing = false;

                return cars.indexOf(car);
            }
        }

        return -1;
    }

    public determinePlayersTime(cars: Array<Car>, raceTime: number): void {
        for (let i: number = 0; i < cars.length; i++) {
            this.calculateRemTimeToCompSeg(cars[i]);
            this.calculateRemTimeToCompLap(cars[i]);
            this.remainingRace.remTimeToCompLap += this.remainingRace.remTimeToCompSeg;
            this.calculateLapRemaining(cars[i]);
            this.calculateRemainingSegments(cars[i]);
            this.calculateRemTimeToCompRestOfRace(cars[i]);
            this.simulateBotsLapsTime(i, raceTime);
            this.resetRemainingRace();
        }
    }

    public calculateRemTimeToCompRestOfRace(car: Car): void {
        for (let i: number = 0; i < this.remainingRace.remainingSegments; i++) {
            this.remainingRace.remTimeToCompRestOfRace +=
                car.carGPS.trackSegments[i % car.carGPS.NumberOfTrackSegments].getLength() / car.speed.length();
        }
    }
    public calculateRemTimeToCompLap(car: Car): void {
        for (let i: number = 1; i + car.carGPS.currentSegmentIndex < car.carGPS.NumberOfTrackSegments; i++) {
            this.remainingRace.remTimeToCompLap += car.carGPS.trackSegments[i].getLength() / car.speed.length();
        }
    }

    public calculateRemainingSegments(car: Car): void {
        this.remainingRace.remainingSegments = this.remainingRace.remainingLaps * car.carGPS.trackSegments.length;
    }

    public calculateRemTimeToCompSeg(car: Car): void {
        this.remainingRace.remTimeToCompSeg = Math.sqrt(Math.pow(car.mesh.position.z - car.carGPS.currentSegment.v2.x, 2) +
            Math.pow(car.mesh.position.x - car.carGPS.currentSegment.v2.y, 2)) / car.speed.length();
    }
    public calculateLapRemaining(car: Car): void {
        this.remainingRace.remainingLaps = NUMBER_OF_LAPS - car.carGPS.currentLap;
        this.remainingRace.currentLap = car.carGPS.currentLap;
    }

    public simulateBotsLapsTime(i: number, raceTime: number): void {
        this.simulateBotsUnfinishedLapTime(i, raceTime);
        this.simulateBotsUnstardedLapTime(i, raceTime);
    }

    public addFinishedLapTime(raceTime: number, id: number): void {
        for (const car of this.carsLapsTime) {
            if (id === car.id) {
                let totalPreviousLaps: number = 0;
                for (let j: number = 0; j < car.lapsTime.length; j++) {
                    if (car.lapsTime[j] !== 0) {
                        totalPreviousLaps += car.lapsTime[j];
                    } else if (car.lapsTime[j] === 0) {
                        car.lapsTime[j] = raceTime - totalPreviousLaps;
                        break;
                    }
                }
            }
        }
    }

    public simulateBotsUnfinishedLapTime(i: number, raceTime: number): void {
        if (this.carsLapsTime[i].lapsTime[this.remainingRace.currentLap - 1] === undefined) { return; }
        this.carsLapsTime[i].lapsTime[this.remainingRace.currentLap - 1] =
            this.carsLapsTime[i].lapsTime[this.remainingRace.currentLap - 1] === 0 ?
                this.remainingRace.remTimeToCompLap + raceTime - this.carsLapsTime[i].lapsTime.reduce((a, b) => a + b, 0) :
                this.carsLapsTime[i].lapsTime[this.remainingRace.currentLap - 1];
    }

    public simulateBotsUnstardedLapTime(i: number, raceTime: number): void {
        if (this.remainingRace.remainingLaps > 0) {
            for (let j: number = NUMBER_OF_LAPS - this.remainingRace.remainingLaps; j < NUMBER_OF_LAPS; j++) {
                this.carsLapsTime[i].lapsTime[j] = this.carsLapsTime[i].lapsTime[j - 1];
            }
        }
    }

    public resetRemainingRace(): void {
        this.remainingRace.remainingLaps = 0;
        this.remainingRace.remainingSegments = 0;
        this.remainingRace.remTimeToCompLap = 0;
        this.remainingRace.remTimeToCompRestOfRace = 0;
        this.remainingRace.remTimeToCompSeg = 0;
        this.remainingRace.currentLap = 0;
    }

    public sortPlayersTime(): void {
        this.carsLapsTime.sort((a: { id: number, lapsTime: number[] }, b: { id: number, lapsTime: number[] }) => {
            return a.lapsTime.reduce((sumA, sumB) => sumA + sumB, 0) -
                b.lapsTime.reduce((sumA, sumB) => sumA + sumB, 0);
        });
    }

    public getTotalTime(index: number): number {
        return this.carsLapsTime[index].lapsTime.reduce((sumA, sumB) => sumA + sumB, 0);
    }

    public controlBots(botCars: Array<BotCar>): void {
        for (const car of botCars) {
            this.isRaceOnGoing ? car.go() : car.stop();
        }
    }

    public youIfPlayer(i: number): string {
        const id: number = this.carsLapsTime[i].id;

        return id === 1 ? "You" : id.toString();
    }
}
