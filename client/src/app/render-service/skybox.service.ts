import {
    Scene,
    Mesh,
    MeshBasicMaterial,
    ImageUtils,
    DoubleSide,
    CubeGeometry,
    Vector3,
    MultiMaterial
} from "three";

import { Injectable } from "@angular/core";
import { URL_NIGHT_PREFIX, URL_DAY_PREFIX, URL_NIGHT_POSTFIX, URL_DAY_POSTFIX } from "../race/constants";

const TAILLE_CUBE: number = 1000;

@Injectable()
export class SkyboxService {
    // TODO: Gerons nous les warning?
    private skyMaterial: MultiMaterial;
    public skybox: Mesh;

    public constructor() { }

    public async createSkybox(scene: Scene, urlPrefix: string, urlPostFix: string): Promise<void> {
        const urls1: string[] = [
            `${urlPrefix}lf${urlPostFix}`,
            `${urlPrefix}rt${urlPostFix}`,
            `${urlPrefix}up${urlPostFix}`,
            `${urlPrefix}dn${urlPostFix}`,
            `${urlPrefix}ft${urlPostFix}`,
            `${urlPrefix}bk${urlPostFix}`
        ];
        const materialArray1: MeshBasicMaterial[] = [];
        for (const img of urls1) {
            materialArray1.push(new MeshBasicMaterial({ map: ImageUtils.loadTexture(img), side: DoubleSide }));
        }
        this.skyMaterial = new MultiMaterial(materialArray1);
        this.skybox = new Mesh(new CubeGeometry(TAILLE_CUBE, TAILLE_CUBE, TAILLE_CUBE), this.skyMaterial);
        scene.add(this.skybox);
    }

    public update(position: Vector3): void {
        this.skybox.position.set(position.x, position.y, position.z);
    }

    public async changeSkybox(scene: Scene, isNight: boolean): Promise<void> {
        scene.remove(this.skybox);
        if (isNight) {
            this.createSkybox(scene, URL_NIGHT_PREFIX, URL_NIGHT_POSTFIX).catch((err) => { console.error(err); });
        } else {
            this.createSkybox(scene, URL_DAY_PREFIX, URL_DAY_POSTFIX).catch((err) => { console.error(err); });
        }
    }
}
