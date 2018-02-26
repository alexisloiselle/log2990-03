import { Injectable } from "@angular/core";
import * as THREE from "three";

export abstract class GameElement {
    public loaded: boolean;
    public display: THREE.Object3D;
    public initialize(container: HTMLDivElement): void { }
}

@Injectable()
export class GameService {
    public loaded: boolean;
    public display: THREE.Object3D;
    public initialize(container: HTMLDivElement): void { }
}
