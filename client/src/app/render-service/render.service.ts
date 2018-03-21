import { Injectable } from "@angular/core";
import Stats = require("stats.js");
import * as THREE from "three";
import { Car } from "../race/car/car";
import { CarEventHandlerService } from "./car-event-handler.service";
import { CameraService } from "./camera.service";
import { SkyboxService } from "./skybox.service";
import { RenderTrackService } from "../render-track/render-track.service";
import { RaceTrack } from "../race/raceTrack";
import { PointCoordinates } from "../race/track-editor/canvas/point-coordinates";

const WHITE: number = 0xFFFFFF;
const AMBIENT_LIGHT_OPACITY: number = 0.5;

@Injectable()
export class RenderService {

    private container: HTMLDivElement;
    private _car: Car;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private stats: Stats;
    private lastDate: number;
    private track: RaceTrack;
    private array: PointCoordinates[] = [];

    public get car(): Car {
        return this._car;
    }

    public constructor(
        private carEventHandlerService: CarEventHandlerService,
        private cameraService: CameraService,
        private skyboxService: SkyboxService,
        private renderTarckService: RenderTrackService) {
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
        this.cameraService.update(this._car.Position);
        this.skyboxService.update(this._car.Position);
        this.lastDate = Date.now();
    }

    private async createScene(): Promise<void> {
        this.scene = new THREE.Scene();

        await this._car.init();
        this.cameraService.createCamera(this._car.Position, this.getAspectRatio(), this.scene);

        this.scene.add(this._car);
        this.scene.add(new THREE.AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY));

        this.skyboxService.createSkybox(this.scene);
        this.createTrack();
    }

    private createTrack(): void {
        // hard code
        const point1: PointCoordinates = new PointCoordinates(329, 114);
        const point11: PointCoordinates = new PointCoordinates(250, 347);
        const point2: PointCoordinates = new PointCoordinates(136, 167);
        const point3: PointCoordinates = new PointCoordinates(329, 114);

        this.array.push(point1);
        this.array.push(point11);
        this.array.push(point2);
        this.array.push(point3);

        this.track = new RaceTrack("laTrack", "fuckYou", 0, this.array);

        let planes: THREE.Mesh[] = [];

        planes = this.renderTarckService.buildTrack(this.track);

        for (const plane of planes) {
            this.scene.add(plane);
        }

        // On oriente la voiture vis-à-vis le premier tronçon
        this.scene.add(this.renderTarckService.genererSurfaceHorsPiste());

        let circles: THREE.Mesh[] = [];
        circles = this.renderTarckService.genererCircle();

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
        this.cameraService.render(this.scene, this.renderer, this._car);
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
