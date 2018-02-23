import { Injectable } from "@angular/core";
import Stats = require("stats.js");
import * as THREE from "three";
import { Car } from "../race/car/car";
import { CarEventHandlerService } from "./car-event-handler.service";

const FAR_CLIPPING_PLANE: number = 1000;
const NEAR_CLIPPING_PLANE: number = 1;
const FIELD_OF_VIEW: number = 70;

// const INITIAL_CAMERA_POSITION_Y: number = 25;
const WHITE: number = 0xFFFFFF;
const AMBIENT_LIGHT_OPACITY: number = 0.5;

@Injectable()
export class RenderService {
    private camera: THREE.PerspectiveCamera;
    private container: HTMLDivElement;
    private _car: Car;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private stats: Stats;
    private lastDate: number;
    private skybox: THREE.Mesh;
    private material: THREE.MeshFaceMaterial;

    public get car(): Car {
        return this._car;
    }

    public constructor(private carEventHandlerService: CarEventHandlerService) {
        this._car = new Car();
    }

    public async initialize(container: HTMLDivElement): Promise<void> {
        if (container) {
            this.container = container;
        }

        await this.createScene();
        this.initStats();
        this.startRenderingLoop();
    }

    private initStats(): void {
        this.stats = new Stats();
        this.stats.dom.style.position = "absolute";
        this.container.appendChild(this.stats.dom);
    }

    private update(): void {
        const timeSinceLastFrame: number = Date.now() - this.lastDate;
        this._car.update(timeSinceLastFrame);
        this.lastDate = Date.now();
        this.skybox.position.set(this._car.Position.x,this._car.Position.y,this._car.Position.z);
    }

    private async createScene(): Promise<void> {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            FIELD_OF_VIEW,
            this.getAspectRatio(),
            NEAR_CLIPPING_PLANE,
            FAR_CLIPPING_PLANE
        );

        await this._car.init();

        // this for third person camera (test skybox)
        this.camera.position.z = 10;
        this.camera.position.y = 5;
        this.camera.lookAt(this._car.position);
        this.car.attachCamera(this.camera);

        // this for top view (as given)
        // this.camera.position.set(0, INITIAL_CAMERA_POSITION_Y, 0);
        // this.camera.lookAt(this._car.position);

        this.scene.add(this._car);
        this.scene.add(new THREE.AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY));

        // skybox
        this.createSkybox();
    }

    
    private createSkybox(): void {
        this.initSkybox();
        this.skybox = new THREE.Mesh(new THREE.CubeGeometry(1000,1000,1000), this.material);
        this.scene.add(this.skybox);
    }

    private initSkybox(): void {
        const urlPrefix = "../../assets/skybox/"
        const urls = [urlPrefix + "lf.png", urlPrefix + "rt.png",
        urlPrefix + "up.png", urlPrefix + "dn.png",
        urlPrefix + "ft.png", urlPrefix + "bk.png"];
        let materialArray: THREE.MeshBasicMaterial[] = [];
        urls.forEach((image: string) => {
            materialArray.push(new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(image),
                side: THREE.DoubleSide
            }));
        });
        this.material = new THREE.MeshFaceMaterial(materialArray);
    }

    private getAspectRatio(): number {
        return this.container.clientWidth / this.container.clientHeight;
    }

    private startRenderingLoop(): void {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

        this.lastDate = Date.now();
        this.container.appendChild(this.renderer.domElement);
        this.render();
    }

    private render(): void {
        requestAnimationFrame(() => this.render());
        this.update();
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }

    public onResize(): void {
        this.camera.aspect = this.getAspectRatio();
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    public handleKeyDown(event: KeyboardEvent): void {
        this.carEventHandlerService.handleKeyDown(event, this._car, this.camera);
    }

    public handleKeyUp(event: KeyboardEvent): void {
      this.carEventHandlerService.handleKeyUp(event, this._car, this.camera);
    }

}
