import { Injectable } from "@angular/core";
import Stats = require("stats.js");
import * as THREE from "three";
import { Car } from "../race/car/car";
import { BotCar } from "../race/car/bot-car";
import { CarEventHandlerService } from "./car-event-handler.service";
// tslint:disable-next-line:no-duplicate-imports
import { CubeTextureLoader, Vector3, Object3D, ObjectLoader } from "three";

const FAR_CLIPPING_PLANE: number = 1000;
const NEAR_CLIPPING_PLANE: number = 1;
const FIELD_OF_VIEW: number = 70;
const WHITE: number = 0xFFFFFF;
const AMBIENT_LIGHT_OPACITY: number = 0.5;

@Injectable()
export class RenderService {

    private camera: THREE.PerspectiveCamera;
    private container: HTMLDivElement;
    private mainCar: Car;
    private botCars: Array<BotCar> = new Array<BotCar>();
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private stats: Stats;
    private lastDate: number;

    public get car(): Car {
        return this.mainCar;
    }

    public constructor(private carEventHandlerService: CarEventHandlerService) {
        this.mainCar = new Car();
        const numberBotCars: number = 3;
        for (let i: number = 0; i < numberBotCars; i++) {
            this.botCars.push(new BotCar());
        }
    }

    public async initialize(container: HTMLDivElement): Promise<void> {
        if (container) {
            this.container = container;
        }

        await this.createScene();
        this.botCars[0].startAccelerating();
        this.botCars[0].turn();
        this.initStats();
        this.startRenderingLoop();
    }

    private async loadCar(descriptionFileName: string): Promise<Object3D> {
        return new Promise<Object3D>((resolve, reject) => {
            const loader: ObjectLoader = new ObjectLoader();
            loader.load(descriptionFileName, (object) => {
                resolve(object);
            });
        });
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
            this.botCars[i].init(await this.loadCar(carModelsDirectories[i]));
            this.botCars[i].translateOnAxis(new Vector3(0, 0, positions[i]), 1);
            this.scene.add(this.botCars[i]);
        }
    }

    private update(): void {
        const timeSinceLastFrame: number = Date.now() - this.lastDate;
        this.mainCar.update(timeSinceLastFrame);
        this.lastDate = Date.now();
    }

    private async createScene(): Promise<void> {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            FIELD_OF_VIEW,
            this.getAspectRatio(),
            NEAR_CLIPPING_PLANE,
            FAR_CLIPPING_PLANE
        );

        await this.mainCar.init(await this.loadCar("../../assets/camero/camero-2010-low-poly.json"));

        // this for third person camera (test skybox)
        /* tslint:disable:no-magic-numbers */
        this.camera.position.z = 10;
        this.camera.position.y = 5;
        this.camera.lookAt(this.mainCar.position);
        this.car.attachCamera(this.camera);
        this.scene.add(this.mainCar);

        this.initBotCars();
        this.scene.add(new THREE.AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY));

        this.createSkybox();
    }

    private createSkybox(): void {
        this.scene.background = new THREE.CubeTextureLoader()
            .setPath("../../assets/skybox/")
            .load([
                "lf.png",
                "rt.png",
                "up.png",
                "dn.png",
                "ft.png",
                "bk.png"
            ]);
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
        this.carEventHandlerService.handleKeyDown(event, this.mainCar, this.camera);
    }

    public handleKeyUp(event: KeyboardEvent): void {
      this.carEventHandlerService.handleKeyUp(event, this.mainCar, this.camera);
    }
}
