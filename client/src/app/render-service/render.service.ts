import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
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
import THREE = require("three");
import { SoundsService } from "./sounds.service";
import { LightManager } from "./light-manager";
import { STARTING_SOUND, TIME_SINCE_LAST_UPDATE_COEFFICIENT } from "../config";

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
        if (container) { this.container = container; }
        await this.loadTrack(raceTrackId);
        await this.createScene();
        this.hudService.initialize();
        this.startRenderingLoop();
        this.soundsService.playSound(STARTING_SOUND);
        this.listenIncrementLap();
        this.raceAdministratorService.initializeCarsLapsTime(this.cars);
        this.raceOnGoing = true;
    }

    private async initBotCars(): Promise<void> {
        const carModelsDirectories: Array<string> = [
            "../../assets/porsche/porsche.json",
            "../../assets/lamborghini/lamborghini.json",
            "../../assets/porsche/porsche.json"];
        for (let i: number = 0; i < this.botCars.length; i++) {
            this.botCars[i].init(await RenderService.loadCar(carModelsDirectories[i]));
            this.botCars[i].translateOnAxis(new THREE.Vector3(0, 0, 0), 1);
            this.scene.add(this.botCars[i]);
            this.scene.add(this.botCars[i].headlight.Target);
        }

    }

    private update(): void {
        if (this.raceOnGoing) {
            const timeSinceLastFrame: number = Date.now() - this.lastDate;
            for (const car of this.cars) {
                car.update(timeSinceLastFrame * TIME_SINCE_LAST_UPDATE_COEFFICIENT);
                car.carGPS.updatePosition(car.mesh);
            }
            this.raceAdministratorService.controlBots(this.botCars);
            const index: number = this.raceAdministratorService.determineWinner(this.cars);
            if (index === 0) { this.manageRaceEnd(index); }
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
        this.scene.add(this._car.headlight.Target);
        this.scene.add(LightManager.createLight(this.isNight));

        await this.initBotCars();
        this.skyboxService.createSkybox(this.scene, URL_DAY_PREFIX, URL_DAY_POSTFIX).catch((err) => { console.error(err); });
        await this.createTrack();
        for (const car of this.cars) { car.initializeGPS(this.track.segments, this.track.width); }
        await this.orientAndPositionCars();
    }

    private async createTrack(): Promise<void> {
        if (this.track == null) {
            this.track = await this.renderTrackService.generateDefaultTrack();
        }
        const planes: THREE.Mesh[] = this.renderTrackService.buildTrack(this.track);
        for (const plane of planes) { this.scene.add(plane); }

        this.scene.add(this.renderTrackService.generateOffTrackSurface());

        const circles: THREE.Mesh[] = this.renderTrackService.patchTrack(this.track.width);

        for (const circle of circles) { this.scene.add(circle); }
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

    private async changeMomentOfTheDay(): Promise<void> {
        this.isNight = !this.isNight;
        LightManager.removeAmbiantLight(this.scene);
        for (const car of this.cars) {
            car.changeLight();
        }
        this.scene.add(LightManager.createLight(this.isNight));
        this.skyboxService.changeSkybox(this.scene, this.isNight).catch((err) => { console.error(err); });
    }

    public handleKeyUp(event: KeyboardEvent): void {
        if (this.raceOnGoing) {
            if (this.carEventHandlerService.handleKeyUp(event, this._car)) {
                this.changeMomentOfTheDay().catch((err) => { console.error(err); });
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

}
