import { Injectable } from "@angular/core";
import * as THREE from "three";
import Stats = require("stats.js");

const SECOND: number = 2;
const TEN: number = 10;

export abstract class GameElement {
    public loaded: boolean;
    public display: THREE.Object3D;
    public update(dt: number): void { }
    public initialize(container: HTMLDivElement): void { }
}

enum Camera2D {
    InitPositionY = 1000,
}

enum PerspectiveZoom {
    InFactor = 0.8,
    OutFactor = 1.25,
    OutLimit = 190,
    InLimit = 12
}

enum OrthographicZoom {
    InFactor = 1.25,
    OutFactor = 0.8,
    OutLimit = 0.2,
    InLimit = 4.8
}
enum RearView {
    Width = 240,
    Heigth = 160
}
@Injectable()
export class GameService {
    private readonly CAMERA_3D_FAR_VALUE: number = 100000;
    private readonly REARVIEW_FAR_VALUE: number = 1000000;
    private readonly FIELD_OF_VIEW: number = 100;
    protected readonly ORIGIN: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    private raycaster: THREE.Raycaster = new THREE.Raycaster();
    private gameElements: GameElement[] = [];
    private clock: THREE.Clock = new THREE.Clock();
    private scene2D: THREE.Scene = new THREE.Scene();
    protected scene3D: THREE.Scene = new THREE.Scene();

    private container: HTMLDivElement;
    private camera2D: THREE.OrthographicCamera;
    private stats: Stats;
    private requestId: number;
    public isRearView: boolean = false;
    public camera3D: THREE.Camera;
    public rearViewCamera3D: THREE.Camera;

    public get sceneHUD(): THREE.Scene {
        return this.scene2D;
    }

    public initialize(container: HTMLDivElement): void {
        this.container = container;
        this.initScenesAndCameras();
        this.initStats();
    }

    public stopGame(): void {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
        this.gameElements = [];
        this.scene2D.children = [];
        this.scene3D.children = [];
        this.clock.stop();
    }

    public startGame(): void {
        if (this.container === undefined) {
            throw new Error("The game cannot start before it is initialized, please call initialize() before calling this.");
        }
        this.clock.start();
        this.startRenderingLoop();
    }
    protected initScenesAndCameras(): void {

        this.camera2D = new THREE.OrthographicCamera(
            this.container.clientWidth / -SECOND,
            this.container.clientWidth / SECOND,
            this.container.clientHeight / SECOND,
            this.container.clientHeight / -SECOND,
            0
        );
        this.camera2D.position.set(0, Camera2D.InitPositionY, 0);

        this.camera3D = new THREE.PerspectiveCamera(
            this.FIELD_OF_VIEW,
            this.container.clientWidth / this.container.clientHeight,
            1,
            this.CAMERA_3D_FAR_VALUE
        );

        this.camera3D.lookAt(new THREE.Vector3());

        this.rearViewCamera3D = new THREE.PerspectiveCamera(
            this.FIELD_OF_VIEW,
            this.container.clientWidth / this.container.clientHeight,
            1,
            this.REARVIEW_FAR_VALUE
        );

        this.rearViewCamera3D.lookAt(new THREE.Vector3());
    }

    private initStats(): void {
        this.stats = new Stats();
        this.stats.dom.style.position = "absolute";
        this.container.appendChild(this.stats.dom);
    }

    private startRenderingLoop(): void {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.autoClear = false;
        this.container.appendChild(this.renderer.domElement);
        this.render();
    }

    private render(): void {
        this.renderer.setViewport(0, 0, this.container.clientWidth, this.container.clientHeight);
        const dt: number = this.clock.getDelta();
        this.requestId = requestAnimationFrame(() => this.render());
        this.renderer.render(this.scene3D, this.camera3D);
        if (this.isRearView && (this.camera3D instanceof THREE.PerspectiveCamera)) {
            this.renderer.setViewport(TEN, this.container.clientHeight - RearView.Heigth - TEN, RearView.Width, RearView.Heigth);
            this.renderer.render(this.scene3D, this.rearViewCamera3D);
            this.renderer.setViewport(0, 0, this.container.clientWidth, this.container.clientHeight);
        }
        this.renderer.render(this.scene2D, this.camera2D);
        this.update(dt);
    }

    protected update(dt: number): void {
        this.stats.update();
        this.gameElements.forEach((element) => element.update(dt));
    }

    public addGameElement(element: GameElement): void {
        element.initialize(this.container);
        this.scene3D.add(element.display);
        this.gameElements.push(element);
    }

    public addUIElement(element: GameElement, isHUD?: boolean): void {
        if (isHUD) {
            this.camera2D.position.set(0, 0, 0);
        } else {
            this.camera2D.position.set(0, Camera2D.InitPositionY, 0);
            this.camera2D.lookAt(new THREE.Vector3(0, 0, 0));
        }
        element.initialize(this.container);
        this.scene2D.add(element.display);
        this.gameElements.push(element);
    }

    public raycasterFromMouse(mouseX: number, mouseY: number, is3D?: boolean): THREE.Raycaster {
        const camera: THREE.Camera = is3D ? this.camera3D : this.camera2D;

        const topOffset: number = this.container.getBoundingClientRect().top
            - this.container.ownerDocument.documentElement.clientTop;
        const leftOffset: number = this.container.getBoundingClientRect().left
            - this.container.ownerDocument.documentElement.clientLeft;

        const raycasterPosition: THREE.Vector2 = new THREE.Vector2();
        raycasterPosition.x = ((mouseX - leftOffset) / this.container.clientWidth) * SECOND - 1;
        raycasterPosition.y = - ((mouseY - topOffset) / this.container.clientHeight) * SECOND + 1;
        this.raycaster.setFromCamera(raycasterPosition, camera);

        return this.raycaster;
    }

    public takeScreenShot(): string {
        this.renderer.render(this.scene3D, this.camera3D);
        this.renderer.render(this.scene2D, this.camera2D);

        return this.renderer.domElement.toDataURL();
    }

    public set statsVisible(v: boolean) {
        this.stats.dom.style.visibility = v ? "visible" : "hidden";
    }
    public onResize(): void {
        this.camera2D.left = this.container.clientWidth / -SECOND,
            this.camera2D.right = this.container.clientWidth / SECOND,
            this.camera2D.top = this.container.clientHeight / SECOND,
            this.camera2D.bottom = this.container.clientHeight / -SECOND,
            this.camera2D.updateProjectionMatrix();
        this.camera2D.updateProjectionMatrix();

        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    public zoom(zoomIn: boolean): void {
        if (this.camera3D instanceof THREE.PerspectiveCamera) {
            const factor: PerspectiveZoom.InFactor| PerspectiveZoom.OutFactor
                = zoomIn ? PerspectiveZoom.InFactor : PerspectiveZoom.OutFactor;
            const limitRespected: boolean = zoomIn ?
                this.camera3D.position.y * PerspectiveZoom.InFactor > PerspectiveZoom.InLimit :
                this.camera3D.position.y * PerspectiveZoom.OutFactor < PerspectiveZoom.OutLimit;
            if (limitRespected) {
                this.camera3D.position.z *= factor;
                this.camera3D.position.y *= factor;
            }
        } else if (this.camera3D instanceof THREE.OrthographicCamera) {
            const factor: OrthographicZoom.InFactor | OrthographicZoom.OutFactor
                        = zoomIn ? OrthographicZoom.InFactor : OrthographicZoom.OutFactor;
            const limitRespected: boolean = zoomIn ?
                this.camera3D.zoom * OrthographicZoom.InFactor < OrthographicZoom.InLimit :
                this.camera3D.zoom * OrthographicZoom.OutFactor > OrthographicZoom.OutLimit;
            if (limitRespected) {
                this.camera3D.zoom *= factor;
                this.camera3D.updateProjectionMatrix();
            }
        }
    }

    public set3DBackground(background: THREE.Scene): void {
        this.scene3D.background = background;
    }

    public set2DBackground(background: THREE.Scene): void {
        this.scene2D.background = background;
    }

}
