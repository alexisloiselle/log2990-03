import { TestBed, inject } from "@angular/core/testing";
import { } from "jasmine";

import { CollisionService } from "./collision.service";
import { Car } from "../car/car";
import { RenderService } from "../../render-service/render.service";
import { Vector3 } from "three";

// tslint:disable:no-magic-numbers
describe("CollisionService", () => {
    let collisionService: CollisionService;
    let car1: Car;
    let car2: Car;
    const cars: Car[] = [];

    beforeEach(async (done: () => void) => {
        TestBed.configureTestingModule({
            providers: [CollisionService]
        });
        collisionService = new CollisionService();
        car1 = new Car();
        car2 = new Car();
        car1.init(await RenderService.loadCar("../../assets/camero/camero-2010-low-poly.json"));
        car2.init(await RenderService.loadCar("../../assets/camero/camero-2010-low-poly.json"));
        cars.push(car1);
        cars.push(car2);
        done();

    });

    it("should be created", inject([CollisionService], (service: CollisionService) => {
        expect(service).toBeTruthy();
    }));

    describe("isInCollision", () => {
        it("should be in collision", () => {
            car1.position.set(0, 0, 0);
            car2.position.set(0, 0, 0);
            car1.update(10);
            car2.update(10);
            expect(collisionService.isInCollision(car1, car2)).toEqual(true);
        });
        it("should not be in collision", () => {
            car1.position.set(0, 0, 0);
            car2.position.set(5, 0, 0);
            car1.update(10);
            car2.update(10);
            expect(collisionService.isInCollision(car1, car2)).toEqual(false);
        });
    });

    describe("handleCollision", () => {
        it("car2 should move after collision", () => {
            const initialSpeed2: number = car2.speed.length();
            expect(initialSpeed2).toEqual(0);
            car1.position.set(0, 0, 0);
            car2.position.set(-10, 0, 0); // in front of car1
            car1.speed = new Vector3(0, 0, -10); // going forward
            while (!collisionService.isInCollision(car1, car2)) {
                car1.update(10);
                car2.update(10);
            }
            collisionService.checkForCollision(cars, [], 0);
            expect(car2.speed.length()).toBeGreaterThan(initialSpeed2);
        });
    });
});
