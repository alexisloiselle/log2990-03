import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import Stats = require("stats.js");
import * as THREE from "three";
import { Car } from "../race/car/car";
import { BotCar } from "../race/car/bot-car";
import { CarEventHandlerService } from "./car-event-handler.service";
import { CameraService } from "./camera.service";
import { SkyboxService } from "./skybox.service";
import { RenderTrackService } from "../render-track/render-track.service";
import { CollisionService } from "../race/collisions/collision.service";
import { RaceTrack } from "../race/raceTrack";
import { HudService } from "./hud.service";
import { RaceAdministratorService } from "../race/race-services/race-administrator.service";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

const WHITE: number = 0xFFFFFF;
const AMBIENT_LIGHT_OPACITY: number = 0.5;
const QUIT_KEYCODE: number = 81;    // q
const STARTING_SOUND: string = "../../assets/sounds/ReadySetGo.ogg";
const INITIAL_VOLUME: number = 0.3;

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
    private endRaceSub: Subject<RaceTrack>;

    public audioListener: THREE.AudioListener;
    public startingSound: THREE.Audio;

    public loader: THREE.ImageLoader;

    public get car(): Car {
        return this._car;
    }

    public constructor(
        private carEventHandlerService: CarEventHandlerService,
        private cameraService: CameraService,
        private skyboxService: SkyboxService,
        private collisionService: CollisionService,
        private renderTrackService: RenderTrackService,
        private hudService: HudService,
        private raceAdministratorService: RaceAdministratorService,
        private route: Router) {
        this._car = new Car();
        this.cars.push(this._car);

        const numberBotCars: number = 3;
        for (let i: number = 0; i < numberBotCars; i++) {
            const botCar: BotCar = new BotCar();
            this.botCars.push(botCar);
            this.cars.push(botCar);
        }
        this.track = null;
    }

    public static async loadCar(descriptionFileName: string): Promise<THREE.Object3D> {
        return new Promise<THREE.Object3D>((resolve, reject) => {
            const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
            loader.load(descriptionFileName, (object) => {
                resolve(object);
            });
        });
    }

    public get EndRaceSub(): Observable<RaceTrack> {
        return this.endRaceSub.asObservable();
    }

    private listenIncrementLap(): void {
        this._car.carGPS.IncrementLapSub.subscribe(() => {
            this.hudService.finishLap();
        });
    }

    public async initialize(container: HTMLDivElement): Promise<void> {
        if (container) {
            this.container = container;
        }
        await this.createScene();
        this.hudService.initialize();
        this.initStats();
        this.startRenderingLoop();
        this.loadSounds();
        this.listenIncrementLap();
    }

    private initStats(): void {
        this.stats = new Stats();
        this.stats.dom.style.position = "absolute";
        this.container.appendChild(this.stats.dom);
    }

    private async initBotCars(): Promise<void> {
        const carModelsDirectories: Array<string> = [
            "../../assets/porsche/porsche.json",
            "../../assets/lamborghini/lamborghini.json",
            "../../assets/porsche/porsche.json"
        ];
        for (let i: number = 0; i < this.botCars.length; i++) {
            this.botCars[i].init(await RenderService.loadCar(carModelsDirectories[i]));
            this.botCars[i].translateOnAxis(new THREE.Vector3(0, 0, 0), 1);
            this.scene.add(this.botCars[i]);
        }

    }

    private update(): void {
        const timeSinceLastFrame: number = Date.now() - this.lastDate;
        // this._car.update(timeSinceLastFrame);
        for (const car of this.cars) {
            // tslint:disable-next-line:no-magic-numbers
            car.update(timeSinceLastFrame * 2.5);
            // car.go();
        }
        this.raceAdministratorService.controlBots(this.botCars);
        if (this.raceAdministratorService.determineWinner(this.cars) >= 0) {
            this.endRaceSub.next(this.track);
        }
        this.cameraService.update(this._car.Position);
        this.skyboxService.update(this._car.Position);
        this.collisionService.checkForCollision(this.cars, this.track.segments, this.track.width);
        this.hudService.update();
        this.lastDate = Date.now();
    }

    public get playerLap(): number {
        return this.raceAdministratorService.getPlayerLap(this._car);
    }

    private async createScene(): Promise<void> {
        this.scene = new THREE.Scene();
        this._car.init(await RenderService.loadCar("../../assets/camero/camero-2010-low-poly.json"));
        this.cameraService.createCameras(this._car.Position, this.getAspectRatio(), this.scene);
        this.scene.add(this._car);

        this.scene.add(new THREE.AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY));
        await this.initBotCars();
        this.skyboxService.createSkybox(this.scene);
        await this.createTrack();
        for (const car of this.cars) {
            car.initializeGPS(this.track.segments, this.track.width);
        }
        await this.orientAndPositionCars();
    }

    private async createTrack(): Promise<void> {
        if (this.track == null) {
            await (this.track = this.renderTrackService.generateDefaultTrack());
        }
        let planes: THREE.Mesh[] = [];
        await (planes = this.renderTrackService.buildTrack(this.track));
        for (const plane of planes) {
            this.scene.add(plane);
        }

        this.scene.add(this.renderTrackService.generateOffTrackSurface());

        let circles: THREE.Mesh[] = [];
        circles = this.renderTrackService.patchTrack(this.track.width);

        for (const circle of circles) {
            this.scene.add(circle);
        }
        this.scene.add(this.renderTrackService.createStartingLine(this.track.width));
    }

    private async orientAndPositionCars(): Promise<void> {
        this._car.orientCar(this.track.segments[0]);

        for (const botCar of this.botCars) {
            botCar.orientCar(this.track.segments[0]);
        }

        this.renderTrackService.positionCars(this._car, this.botCars);
    }

    public loadTrack(track: RaceTrack): void {
        this.track = track;
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
        if (event.keyCode === QUIT_KEYCODE) { this.clearGameView(); }
    }

    public handleKeyUp(event: KeyboardEvent): void {
        this.carEventHandlerService.handleKeyUp(event, this._car);
    }

    public clearGameView(): void {
        this.track = null;
        for (const children of this.scene.children) { this.scene.remove(children); }
        this.cars.forEach((car) => { this.cars.pop(); });
        this.scene = new THREE.Scene;
        this.route.navigateByUrl("/track-list");
    }

    public getStartingSound(): THREE.Audio {
        return Object.create(this.startingSound);
    }

    private loadSounds(): void {
        this.audioListener = new THREE.AudioListener();
        this.startingSound = new THREE.Audio(this.audioListener);
        const audioLoader: THREE.AudioLoader = new THREE.AudioLoader();
        audioLoader.load(
            STARTING_SOUND,
            (audioBuffer: THREE.AudioBuffer) => {
                this.startingSound.setBuffer(audioBuffer);
                this.startingSound.setVolume(INITIAL_VOLUME);
                this.startingSound.setLoop(false);
                this.startingSound.play();
            },
            () => { },
            () => { });
    }

    public sleep(miliseconds: number): void {
        const currentTime: number = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) { }
    }

    public get Track(): RaceTrack {
        return new RaceTrack(this.track.name, this.track.description, this.track.type, this.track.points);
    }
}
