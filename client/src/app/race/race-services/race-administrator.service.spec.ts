import { TestBed, inject } from "@angular/core/testing";

import { RaceAdministratorService } from "./race-administrator.service";
import { Car } from "../car/car";
import { LineCurve } from "three";
import { BotCar } from "../car/bot-car";

// tslint:disable:no-magic-numbers
describe("RaceAdministratorService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RaceAdministratorService]
        });
    });

    it("should be created", inject([RaceAdministratorService], (service: RaceAdministratorService) => {
        expect(service).toBeTruthy();
    }));
    const trackWidth: number = 50;
    const trackSegments: Array<LineCurve> = [];
    const cars: Car[] = [];
    const botCars: BotCar[] = [];
    const car1: Car = new Car();
    car1.initializeGPS(trackSegments, trackWidth);
    const car2: BotCar = new BotCar();
    const car3: BotCar = new BotCar();
    car3.initializeGPS(trackSegments, trackWidth);
    const car4: BotCar = new BotCar();
    car4.initializeGPS(trackSegments, trackWidth);
    cars.push(car1);
    cars.push(car2);
    cars.push(car3);
    cars.push(car4);
    botCars.push(car2);
    botCars.push(car3);
    botCars.push(car4);

    describe("CarsLapTime", () => {
        it("should be initialized", inject([RaceAdministratorService], (service: RaceAdministratorService) => {
            service.initializeCarsLapsTime(cars);
            for (const car of service.carsLapsTime) {
                expect(car.id).toBeGreaterThan(0);
                for (const lap of car.lapsTime) {
                    expect(lap).toBe(0);
                }
            }
        }));
    });
    describe("getCarLap", () => {
        it("should Be equal to 1", inject([RaceAdministratorService], (service: RaceAdministratorService) => {
            expect(service.getCarLap(car1)).toEqual(1);
        }));

        it("should Be equal to 0", inject([RaceAdministratorService], (service: RaceAdministratorService) => {
            expect(service.getCarLap(car2)).toEqual(0);
        }));

    });
    describe("determinedWinner", () => {
        it("should Be equal to 0", inject([RaceAdministratorService], (service: RaceAdministratorService) => {
            car2.initializeGPS(trackSegments, trackWidth);

            expect(service.determineWinner(cars)).toEqual(-1); // TODO MOCK OBSERVABLE
        }));

    });

    describe("sortPlayersTime", () => {
        it("should sort carsLapTime in this order car4,car3,car2,car1",
           inject([RaceAdministratorService], (service: RaceAdministratorService) => {
                const time1: number = 10;
                const time2: number = 11;
                const time3: number = 12;
                const time4: number = 13;
                const idCar1: number = 1;
                const idCar2: number = 2;
                const idCar3: number = 3;
                const idCar4: number = 4;

                service.carsLapsTime.push({id: idCar1, lapsTime: [time4, time4, time4] });
                service.carsLapsTime.push({id: idCar2, lapsTime: [time3, time3, time3] });
                service.carsLapsTime.push({id: idCar3, lapsTime: [time2, time2, time2] });
                service.carsLapsTime.push({id: idCar4, lapsTime: [time1, time1, time1] });
                service.sortPlayersTime();
                expect(service.carsLapsTime[0].id).toEqual(4);
                expect(service.carsLapsTime[1].id).toEqual(3);
                expect(service.carsLapsTime[2].id).toEqual(2);
                expect(service.carsLapsTime[3].id).toEqual(1);
            }));

    });
    describe("getTotalTime", () => {
        it("should be equal to the total of 3 laps",
           inject([RaceAdministratorService], (service: RaceAdministratorService) => {
            const time1: number = 10;
            const idCar1: number = 1;
            service.carsLapsTime.push({id: idCar1, lapsTime: [time1, time1, time1] });
            expect(service.getTotalTime(0)).toEqual(30);
            }));

    });

    describe("youIfPlayer", () => {
        const time1: number = 10;
        const time2: number = 11;
        const time3: number = 12;
        const time4: number = 13;
        const idCar1: number = 1;
        const idCar2: number = 2;
        const idCar3: number = 3;
        const idCar4: number = 4;

        it("should be a string",
           inject([RaceAdministratorService], (service: RaceAdministratorService) => {
            service.carsLapsTime.push({id: idCar1, lapsTime: [time4, time4, time4] });
            service.carsLapsTime.push({id: idCar2, lapsTime: [time3, time3, time3] });
            service.carsLapsTime.push({id: idCar3, lapsTime: [time2, time2, time2] });
            service.carsLapsTime.push({id: idCar4, lapsTime: [time1, time1, time1] });
            service.youIfPlayer(0);
            expect(service.carsLapsTime[0].id).toMatch("1");
            }));

        it("should be a string",
           inject([RaceAdministratorService], (service: RaceAdministratorService) => {
            service.carsLapsTime.push({id: idCar1, lapsTime: [time4, time4, time4] });
            service.carsLapsTime.push({id: idCar2, lapsTime: [time3, time3, time3] });
            service.carsLapsTime.push({id: idCar3, lapsTime: [time2, time2, time2] });
            service.carsLapsTime.push({id: idCar4, lapsTime: [time1, time1, time1] });
            service.youIfPlayer(1);
            expect(service.carsLapsTime[1].id).toEqual(2);
        }));

    });

});
