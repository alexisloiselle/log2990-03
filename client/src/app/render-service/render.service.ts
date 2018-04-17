import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import Stats = require("stats.js");
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
import { TrackService } from "../track.service";
import { URL_DAY_PREFIX, URL_DAY_POSTFIX } from "../race/constants";
import { Object3D } from "three";
import THREE = require("three");
import { SoundsService } from "./sounds.service";
import { STARTING_SOUND } from "../config";

const WHITE: number = 0xFFFFFF;
const GREY: number = 0x334F66;
const AMBIENT_LIGHT_OPACITY: number = 0.5;
const QUIT_KEYCODE: number = 81;    // q

@Injectable()
export class RenderService {

    private raceOnGoing: boolean;
    private container: HTMLDivElement;
    private _car: Car;
    private cars: Car[] = [];
    private botCars: Array<BotCar> = new Array<BotCar>();
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private stats: Stats;
    private lastDate: number;
    private track: RaceTrack;
    private endRaceSub: Subject<{ track: RaceTrack, time: number }>;
    private isNight: boolean;

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
        private trackService: TrackService,
        private route: Router,
        private soundsService: SoundsService
    ) {
        this.endRaceSub = new Subject<{ track: RaceTrack, time: number, isPlayer: boolean }>();

        this._car = new Car();
        this.cars.push(this._car);

        const numberBotCars: number = 3;
        for (let i: number = 0; i < numberBotCars; i++) {
            const botCar: BotCar = new BotCar();
            this.botCars.push(botCar);
            this.cars.push(botCar);
        }
        this.track = null;
        this.isNight = false;
    }

    public static async loadCar(descriptionFileName: string): Promise<THREE.Object3D> {
        return new Promise<THREE.Object3D>((resolve, reject) => {
            const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
            loader.load(descriptionFileName, (object) => {
                resolve(object);
            });
        });
    }

    public get EndRaceSub(): Observable<{ track: RaceTrack, time: number }> {
        return this.endRaceSub.asObservable();
    }

    private listenIncrementLap(): void {
        this._car.carGPS.IncrementLapSub.subscribe(() => {
            this.hudService.finishLap();
            this.raceAdministratorService.addFinishedLapTime(this.hudService.RaceTime, this._car.id);
        });
        for (const botCar of this.botCars) {
            botCar.carGPS.IncrementLapSub.subscribe(() => {
                this.raceAdministratorService.addFinishedLapTime(this.hudService.RaceTime, botCar.id);
            });
        }
    }

    public async initialize(container: HTMLDivElement, raceTrackId: string): Promise<void> {
        if (container) {
            this.container = container;
        }
        await this.loadTrack(raceTrackId);
        await this.createScene();
        this.hudService.initialize();
        this.initStats();
        this.startRenderingLoop();
        this.playStartingSound();
        this.listenIncrementLap();
        this.raceAdministratorService.initializeCarsLapsTime(this.cars);
        this.raceOnGoing = true;
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
            // this.scene.add(this.botCars[i].headlight);
        }

    }

    private update(): void {
        if (this.raceOnGoing) {
            const timeSinceLastFrame: number = Date.now() - this.lastDate;
            for (const car of this.cars) {
                car.update(timeSinceLastFrame * 3); // TODO ENLEVER MAGIC NUMBER
                car.carGPS.updatePosition(car.mesh);
            }
            this.raceAdministratorService.controlBots(this.botCars);
            const index: number = this.raceAdministratorService.determineWinner(this.cars);
            if (index === 0) {
                this.manageRaceEnd(index);
            } else if (index !== -1) {
                this.raceAdministratorService.addWinner(this.cars[index], this.hudService.RaceTime);
            }
            console.log(this._car.speed.length());
            this.cameraService.update(this._car.Position);
            this.skyboxService.update(this._car.Position);
            this.collisionService.checkForCollision(this.cars, this.track.segments, this.track.width);
            this.hudService.update();
            this.lastDate = Date.now();
        }
    }

    private manageRaceEnd(index: number): void {
        this.endRaceSub.next({ track: this.track, time: this.hudService.RaceTime });
        this.raceAdministratorService.determinePlayersTime(this.cars, this.hudService.RaceTime/*, car*/);
        this.raceAdministratorService.sortPlayersTime();
        this.raceOnGoing = false;
    }

    public getPlayerLap(): number {
        return this.raceAdministratorService.getCarLap(this._car);
    }

    private async createScene(): Promise<void> {
        this.scene = new THREE.Scene();
        this._car.init(await RenderService.loadCar("../../assets/camero/camero-2010-low-poly.json"));
        this.cameraService.createCameras(this._car.Position, this.getAspectRatio(), this.scene);
        this.scene.add(this._car);
        // this.scene.add(this._car.headlight);
        const light: THREE.AmbientLight = new THREE.AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY);
        light.name = "ambiantLight";
        this.scene.add(light);
        await this.initBotCars();
        this.skyboxService.createSkybox(this.scene, URL_DAY_PREFIX, URL_DAY_POSTFIX);
        await this.createTrack();
        for (const car of this.cars) {
            car.initializeGPS(this.track.segments, this.track.width);
        }
        await this.orientAndPositionCars();
    }

    private async createTrack(): Promise<void> {
        if (this.track == null) {
            this.track = await this.renderTrackService.generateDefaultTrack();
        }
        const planes: THREE.Mesh[] = this.renderTrackService.buildTrack(this.track);
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

    public async loadTrack(raceTrackId: string): Promise<void> {
        const track: RaceTrack = await this.trackService.getTrack(raceTrackId);
        this.track = new RaceTrack(
            track.id,
            track.name,
            track.description,
            track.type,
            track.points,
            track.bestTimes
        );
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
        if (this.raceOnGoing) {
            this.carEventHandlerService.handleKeyDown(event, this._car);
            if (event.keyCode === QUIT_KEYCODE) { this.clearGameView(); }
        }
    }

    private removeAmbiantLight(): void {
        const light: Object3D = this.scene.getObjectByName("ambiantLight");
        this.scene.remove(light);
    }

    private async changeMomentOfTheDay(): Promise<void> {
        this.isNight = !this.isNight;
        this.removeAmbiantLight();
        // this.car.changeLight();
        let newLight: THREE.AmbientLight;
        newLight = this.isNight ? new THREE.AmbientLight(GREY, AMBIENT_LIGHT_OPACITY) :
                                  new THREE.AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY);
        newLight.name = "ambiantLight";
        this.scene.add(newLight);
        this.skyboxService.changeSkybox(this.scene, this.isNight);
    }

    public handleKeyUp(event: KeyboardEvent): void {
        if (this.raceOnGoing) {
            const isNightKey: boolean = this.carEventHandlerService.handleKeyUp(event, this._car);
            if (isNightKey) {
                this.changeMomentOfTheDay();
            }
        }
    }

    public clearGameView(): void {
        this.track = null;
        for (const children of this.scene.children) { this.scene.remove(children); }
        this.cars.forEach((car) => { this.cars.pop(); });
        this.scene = new THREE.Scene;
        this.route.navigateByUrl("/track-list");
    }

    private playStartingSound(): void {
        this.soundsService.playSound(STARTING_SOUND);
    }

    public sleep(miliseconds: number): void {
        const currentTime: number = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) { }
    }

    public get Track(): RaceTrack {
        return new RaceTrack(
            this.track.id,
            this.track.name,
            this.track.description,
            this.track.type,
            this.track.points
        );
    }
}
