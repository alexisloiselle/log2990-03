import { Injectable } from "@angular/core";
import Stats = require("stats.js");
import * as THREE from "three";
import { Car } from "../race/car/car";
import { BotCar } from "../race/car/bot-car";
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
    private cars: Car[] = [];
    private botCars: Array<BotCar> = new Array<BotCar>();
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
        this.cars.push(this._car);

        const numberBotCars: number = 3;
        for (let i: number = 0; i < numberBotCars; i++) {
            const botCar: BotCar = new BotCar();
            this.botCars.push(botCar);
            this.cars.push(botCar);
        }
    }

    public static async loadCar(descriptionFileName: string): Promise<THREE.Object3D> {
        return new Promise<THREE.Object3D>((resolve, reject) => {
            const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
            loader.load(descriptionFileName, (object) => {
                resolve(object);
            });
        });
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

    private async initBotCars(): Promise<void> {
        // tslint:disable-next-line:no-magic-numbers
        const positions: Array<number> = [-2, 2, 4];
        const carModelsDirectories: Array<string> = ["../../assets/porsche/porsche.json",
                                                     "../../assets/lamborghini/lamborghini.json",
                                                     "../../assets/porsche/porsche.json"];
        for (let i: number = 0; i < this.botCars.length; i++) {
            this.botCars[i].init(await RenderService.loadCar(carModelsDirectories[i]));
            this.botCars[i].translateOnAxis(new THREE.Vector3(0, 0, positions[i]), 1);
            this.scene.add(this.botCars[i]);
        }
    }

    private update(): void {
        const timeSinceLastFrame: number = Date.now() - this.lastDate;
        this._car.update(timeSinceLastFrame);
        this.botCars[0].update(timeSinceLastFrame);
        this.botCars[1].update(timeSinceLastFrame);
        this.botCars[2].update(timeSinceLastFrame);
        this.cameraService.update(this._car.Position);
        this.skyboxService.update(this._car.Position);
        this.collisionService.checkForCollision(this.cars);
        this.lastDate = Date.now();
    }

    private async createScene(): Promise<void> {
        this.scene = new THREE.Scene();
        this._car.init(await RenderService.loadCar("../../assets/camero/camero-2010-low-poly.json"));
        this.cameraService.createCameras(this._car.Position, this.getAspectRatio(), this.scene);
        this.scene.add(this._car);

        this.scene.add(new THREE.AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY));
        await this.initBotCars();
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
