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

    /*
    private gameElements: GameElement[] = [];
    private clock = new THREE.Clock();
    private scene2D = new THREE.Scene();
    protected scene3D = new THREE.Scene();
    */
}
