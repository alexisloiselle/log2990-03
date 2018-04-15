import { Injectable } from "@angular/core";
import {
    HEADLIGHT_COLOR,
    HEADLIGHT_DAY_INTENSITY,
    HEADLIGHT_DISTANCE,
    HEADLIGHT_ANGLE_DIVIDER,
    HEADLIGHT_DIM_PERCENTAGE,
    HEADLIGHT_NIGHT_INTENSITY
} from "./car-constant";
import THREE = require("three");

@Injectable()
export class HeadlightService {

    public headlight: THREE.SpotLight;
    private isLightOpen: boolean;

    public constructor(position: THREE.Vector3, direction: THREE.Vector3) {
        this.createHeadlight(position, direction);
        this.isLightOpen = false;
    }

    private createHeadlight(position: THREE.Vector3, direction: THREE.Vector3): void {
        this.headlight = new THREE.SpotLight(HEADLIGHT_COLOR, HEADLIGHT_DAY_INTENSITY, HEADLIGHT_DISTANCE,
                                             Math.PI / HEADLIGHT_ANGLE_DIVIDER, 0, HEADLIGHT_DIM_PERCENTAGE);
        this.headlight.position.copy(position);
        this.headlight.target.position.copy(direction);
    }

    public updateLocation(): void { }

    public switchLight(): void {
        this.isLightOpen = !this.isLightOpen;
        this.headlight.intensity = this.isLightOpen ? HEADLIGHT_NIGHT_INTENSITY : HEADLIGHT_DAY_INTENSITY;
    }
}
