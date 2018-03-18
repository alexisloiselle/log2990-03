import { Injectable } from "@angular/core";
import Stats = require("stats.js");
import * as THREE from "three";
import { Car } from "../race/car/car";
import { CarEventHandlerService } from "./car-event-handler.service";
// tslint:disable-next-line:no-duplicate-imports
import { CubeTextureLoader } from "three";
import {RenderTrackService} from "../render-track/render-track.service";
import {RaceTrack} from "../race/raceTrack";
import {PointCoordinates} from "../race/track-editor/canvas/point-coordinates";

const FAR_CLIPPING_PLANE: number = 1000;
const NEAR_CLIPPING_PLANE: number = 1;
const FIELD_OF_VIEW: number = 70;
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
    private track: RaceTrack;
    private array: PointCoordinates[] = [];

    public get car(): Car {
        return this._car;
    }

    public constructor(private carEventHandlerService: CarEventHandlerService,
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
        this.lastDate = Date.now();
    }

    /* tslint:disable:no-magic-numbers */
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

        this.scene.add(this._car);
        this.scene.add(new THREE.AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY));

        this.createSkybox();
        this.createTrack();
    }

    private createSkybox(): void {
        this.scene.background = new CubeTextureLoader()
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
    private createTrack(): void {
        let point1: PointCoordinates = new PointCoordinates(95, 60);
        let point11: PointCoordinates = new PointCoordinates(443, 88);
        let point2: PointCoordinates = new PointCoordinates(419, 365);
        let point3: PointCoordinates = new PointCoordinates(121, 393);
        let point4: PointCoordinates = new PointCoordinates(95, 60);
        
        this.array.push(point1);
        this.array.push(point11);
        this.array.push(point2);
        this.array.push(point3);
        this.array.push(point4);

        this.track = new RaceTrack("laTarck", "fuckYou", 0, this.array);

        let planes: THREE.Mesh[] = [];
         
        planes = this.renderTarckService.buildTrack2(this.track);

        for(let i = 0; i<planes.length; i++)
            this.scene.add(planes[i]);
        
        // On oriente la voiture vis-à-vis le premier tronçon
        this.renderTarckService.orienterCar(this._car);
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

