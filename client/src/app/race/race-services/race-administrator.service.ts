import { Injectable } from "@angular/core";
import { BotCar } from "../car/bot-car";
import { Car } from "../car/car";
import { NUMBER_OF_LAPS } from "../../config";

const MEAN_CAR_SPEED: number = 40;  // TODO: POTENTIALLY TO MODIFY

public interface RemainingRace {
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
    private winners: { car: Car, time: number }[];
    public playersTime: Array<number> = [];
    public carsLapsTime: { id: number, lapsTime: number[] }[];
    public remainingRace: RemainingRace;

    public constructor() {
        this.remainingRace.remainingLaps = 0;
        this.remainingRace.remainingSegments = 0;
        this.remainingRace.remTimeToCompLap = 0;
        this.remainingRace.remTimeToCompRestOfRace = 0;
        this.remainingRace.remTimeToCompSeg = 0;
        this.remainingRace.currentLap = 0;
    }

    public initializeCarsLapsTime(cars: Car[]): void {
        for (let i: number = 0; i < cars.length; i++) {
            this.carsLapsTime[i].id = cars[i].id;
            for (let j: number = 0; j < NUMBER_OF_LAPS; j++) {
                this.carsLapsTime[i].lapsTime.push(-1);
            }
        }
    }

    public get IsWinnerDetermined(): boolean {
        return this.winners.length > 0;
    }

    public getCarLap(playerCar: Car): number {
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
                this.calculateRemTimeToCompSeg(car);
                this.calculateRemTimeToCompLap(car);
                this.remainingRace.remTimeToCompLap += this.remainingRace.remTimeToCompSeg;
                this.calculateLapRemaining(car);
                this.calculateRemainingSegments(car);
                this.calculateRemTimeToCompRestOfRace(car);
                this.playersTime.push(this.remainingRace.remTimeToCompLap + this.remainingRace.remTimeToCompRestOfRace);
                this.simulateBotsLapsTime(cars, winnerCar);
                this.resetRemainingRace();
            } else {
                this.playersTime.push(0);
            }
        }
    }

    public calculateRemTimeToCompRestOfRace(car: Car): void {
        for (let i: number = 0; i < this.remainingRace.remainingSegments; i++) {
            this.remainingRace.remTimeToCompRestOfRace += car.carGPS.trackSegments[i % car.carGPS.NumberOfTrackSegments].getLength()
                / MEAN_CAR_SPEED;
        }
    }

    public calculateRemTimeToCompLap(car: Car): void {
        for (let i: number = 1; i + car.carGPS.currentSegmentIndex < car.carGPS.NumberOfTrackSegments; i++) {
            this.remainingRace.remTimeToCompLap += car.carGPS.trackSegments[i].getLength() / MEAN_CAR_SPEED;
        }
    }

    public calculateRemainingSegments(car: Car): void {
        this.remainingRace.remainingSegments = this.remainingRace.remainingLaps * car.carGPS.trackSegments.length;
    }

    public calculateRemTimeToCompSeg(car: Car): void {
        this.remainingRace.remTimeToCompSeg = Math.sqrt(Math.pow(car.mesh.position.z - car.carGPS.currentSegment.v2.x, 2) +
            Math.pow(car.mesh.position.x - car.carGPS.currentSegment.v2.y, 2)) / MEAN_CAR_SPEED;
    }
    public calculateLapRemaining(car: Car): void {
        this.remainingRace.remainingLaps = (NUMBER_OF_LAPS - car.carGPS.currentLap);
        this.remainingRace.currentLap = car.carGPS.currentLap; // METTRE A UNE AUTRE PLACE
    }

    public simulateBotsLapsTime(cars: Array<Car>, winnerCar: Car): void {
        this.simulateBotsUnfinishedLapTime(cars, winnerCar);
        this.simulateBotsUnstardedLapTime(cars, winnerCar);
    }

    public addFinishedLapTime(raceTime: number, id: number): void {
        for (const car of this.carsLapsTime) {
            if (id === car.id) {
                let totalPreviousLaps: number = 0;
                for (let laptime of car.lapsTime) {
                    if (laptime !== 0) {
                        totalPreviousLaps += laptime;
                    } else if (laptime === 0) {
                        laptime = raceTime - totalPreviousLaps;
                    }
                }

            }
        }
    }

    public simulateBotsUnfinishedLapTime(cars: Array<Car>, winnerCar: Car): void {
        for (let i: number = 0; i < cars.length; i++) {
            if (cars[i] !== winnerCar) {
                this.carsLapsTime[i].lapsTime[this.remainingRace.currentLap - 1] = this.remainingRace.remTimeToCompLap;

            }
        }
    }

    public simulateBotsUnstardedLapTime(cars: Array<Car>, winnerCar: Car): void {
        for (let i: number = 0; i < cars.length; i++) {
            if (cars[i] !== winnerCar) {
                for (let j: number = NUMBER_OF_LAPS; j >= this.remainingRace.remainingLaps; j--) {
                    this.carsLapsTime[i].lapsTime[j - 1] = this.remainingRace.remTimeToCompRestOfRace / this.remainingRace.remainingLaps;
                }
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
