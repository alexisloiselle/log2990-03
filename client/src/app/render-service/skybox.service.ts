import {
    Scene,
    MeshFaceMaterial,
    Mesh,
    MeshBasicMaterial,
    ImageUtils,
    DoubleSide,
    CubeGeometry,
    Vector3
} from "three";

import { Injectable } from "@angular/core";

const URL_PREFIX: string = "../../assets/skybox/";
const TAILLE_CUBE: number = 1000;

@Injectable()
export class SkyboxService {

    private skyMaterial: MeshFaceMaterial;
    public skybox: Mesh;

    public constructor() { }

    public createSkybox(scene: Scene): void {
        const urls1: string[] = [
            URL_PREFIX + "lf.png",
            URL_PREFIX + "rt.png",
            URL_PREFIX + "up.png",
            URL_PREFIX + "dn.png",
            URL_PREFIX + "ft.png",
            URL_PREFIX + "bk.png"
        ];
        const materialArray1: MeshBasicMaterial[] = [];
        for (const img of urls1) {
            materialArray1.push(new MeshBasicMaterial({ map: ImageUtils.loadTexture(img), side: DoubleSide }));
        }
        this.skyMaterial = new MeshFaceMaterial(materialArray1);
        this.skybox = new Mesh(new CubeGeometry(TAILLE_CUBE, TAILLE_CUBE, TAILLE_CUBE), this.skyMaterial);
        scene.add(this.skybox);
    }

    public update(position: Vector3): void {
        this.skybox.position.set(position.x, position.y, position.z);
    }
}
