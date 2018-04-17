import * as THREE from "three";
import { Car } from "../car/car";
import {
    HEADLIGHT_DISTANCE,
    HEADLIGHT_COLOR,
    HEADLIGHT_ANGLE,
    HEADLIGHT_HEIGHT
} from "./car-constant";

export class HeadLight {
    private headlight: THREE.SpotLight;

    public constructor() { }

    public initialize(car: Car): void {
        this.headlight = new THREE.SpotLight(HEADLIGHT_COLOR, 0);
        this.headlight.castShadow = true;
        this.headlight.shadow.mapSize.width = HEADLIGHT_DISTANCE;
        this.headlight.shadow.mapSize.height = HEADLIGHT_DISTANCE;
        this.headlight.angle = HEADLIGHT_ANGLE;
        this.initPosition(car);
        car.add(this.headlight);
    }

    public get Target(): THREE.Object3D {
        return this.headlight.target;
    }

    private initPosition(car: Car): void {
        this.headlight.position.set(
            car.Position.x,
            HEADLIGHT_HEIGHT,
            car.Position.z
        );
    }

    public set Intensity(intensity: number) {
        this.headlight.intensity = intensity;
    }

    public update(car: Car): void {
        this.headlight.position.set(
            car.Position.x + car.direction.x,
            this.headlight.position.y,
            car.Position.z + car.direction.z
        );
        this.headlight.target.position.set(
            car.Position.x + car.direction.x * 2,
            HEADLIGHT_HEIGHT,
            car.Position.z + car.direction.z * 2
        );
    }
}
