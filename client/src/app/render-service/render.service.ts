import { Injectable } from "@angular/core";
import Stats = require("stats.js");
import * as THREE from "three";
import { Car } from "../race/car/car";
import { CarEventHandlerService } from "./car-event-handler.service";
import { CameraService } from "./camera.service";
import { SkyboxService } from "./skybox.service";
import { RenderTrackService } from "../render-track/render-track.service";
import { RaceTrack } from "../race/raceTrack";
import { CollisionService } from "../race/collisions/collision.service";

const WHITE: number = 0xFFFFFF;
const AMBIENT_LIGHT_OPACITY: number = 0.5;

@Injectable()
export class RenderService {

    private container: HTMLDivElement;
    private _car: Car;
    private _car2: Car;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private stats: Stats;
    private lastDate: number;
    private track: RaceTrack;

    public get car(): Car {
        return this._car;
    }

    public constructor(
        private carEventHandlerService: CarEventHandlerService,
        private cameraService: CameraService,
        private skyboxService: SkyboxService,
        private collisionService: CollisionService,
        private renderTrackService: RenderTrackService) {
        this._car = new Car();
        this._car2 = new Car();
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
        this._car2.update(timeSinceLastFrame);
        this.cameraService.update(this._car.Position);
        this.skyboxService.update(this._car.Position);
        this.collisionService.checkForCollision(this._car, this._car2);
        this.lastDate = Date.now();
    }

    private async createScene(): Promise<void> {
        this.scene = new THREE.Scene();
        await this._car.init();
        await this._car2.init();
        // tslint:disable-next-line:no-magic-numbers
        this._car2.position.set(0, 0, -10);

        this.cameraService.createCameras(this._car.Position, this.getAspectRatio(), this.scene);
        this.scene.add(this._car);
        this.scene.add(this._car2);

        this.scene.add(new THREE.AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY));
        this.skyboxService.createSkybox(this.scene);
        this.createTrack();
    }

    private createTrack(): void {
        this.track =  this.renderTrackService.generateDefaultTrack();
        let planes: THREE.Mesh[] = [];
        planes = this.renderTrackService.buildTrack(this.track);
        for (const plane of planes) {
            this.scene.add(plane);
        }
        this.scene.add(this.renderTrackService.genererSurfaceHorsPiste());
        let circles: THREE.Mesh[] = [];
        circles = this.renderTrackService.genererCircle();

        for (const circle of circles) {
            this.scene.add(circle);
        }
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
        this.cameraService.render(this.scene, this.renderer);
        this.stats.update();
    }

    public onResize(): void {
        this.cameraService.onResize(this.getAspectRatio());
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    public handleKeyDown(event: KeyboardEvent): void {
        this.carEventHandlerService.handleKeyDown(event, this._car);
    }

    public handleKeyUp(event: KeyboardEvent): void {
        this.carEventHandlerService.handleKeyUp(event, this._car);
    }
}
