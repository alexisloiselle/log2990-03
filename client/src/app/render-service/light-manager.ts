import THREE = require("three");
import { AMBIENT_LIGHT_OPACITY } from "../config";
import { Object3D } from "three";

const WHITE: number = 0xFFFFFF;

export class LightManager {
    public static createLight(isNight: boolean): THREE.AmbientLight {
        const light: THREE.AmbientLight = isNight ?
            new THREE.AmbientLight(WHITE, 0) :
            new THREE.AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY);
        light.name = "ambiantLight";

        return light;
    }

    public static removeAmbiantLight(scene: THREE.Scene): void {
        const light: Object3D = scene.getObjectByName("ambiantLight");
        scene.remove(light);
    }
}
