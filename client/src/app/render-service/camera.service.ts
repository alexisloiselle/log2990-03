import { OrthographicCamera, Vector3, Scene, WebGLRenderer, PerspectiveCamera, Camera } from "three";
import { Injectable } from "@angular/core";
import { Car } from "../race/car/car";

const INITIAL_HEIGHT_ORTHO: number = 90;
const INITIAL_Z_THIRDPERSON: number = 10;
const INITIAL_HEIGHT_THIRDPERSION: number = 4;
const NEAR_CLIPPING_PLANE: number = 1;
const FAR_CLIPPING_PLANE: number = 1000;
const FIELD_OF_VIEW: number = 100;

const ZOOM_FACTOR_INCREMENT: number = 0.01;
const ZOOM_LIMIT: number = 2;
const UNZOOM_LIMIT: number = 0.6;
const EDGE: number = 45;

@Injectable()
export class CameraService {

    public orthographicCamera: OrthographicCamera;
    public thirdPersonCamera: PerspectiveCamera;
    private isOrthographicEnabled: boolean = true;

    public constructor() { }

    public createCamera(position: Vector3, aspectRatio: number, scene: Scene): void {
        this.orthographicCamera = new OrthographicCamera(
            -window.innerWidth / EDGE,
            window.innerWidth / EDGE,
            window.innerHeight / EDGE,
            -window.innerHeight / EDGE,
            NEAR_CLIPPING_PLANE,
            FAR_CLIPPING_PLANE
        );

        this.thirdPersonCamera = new PerspectiveCamera(
            FIELD_OF_VIEW,
            aspectRatio,
            NEAR_CLIPPING_PLANE,
            FAR_CLIPPING_PLANE
        );

        this.thirdPersonCamera.position.setY(INITIAL_HEIGHT_THIRDPERSION);
        this.thirdPersonCamera.position.setZ(INITIAL_Z_THIRDPERSON);
        this.thirdPersonCamera.lookAt(position);

        this.orthographicCamera.position.set(0, INITIAL_HEIGHT_ORTHO, 0);
        this.orthographicCamera.lookAt(position);
        scene.add(this.thirdPersonCamera);
    }

    public render(scene: Scene, renderer: WebGLRenderer, car: Car): void {
        const camera: PerspectiveCamera | OrthographicCamera =
            this.isOrthographicEnabled ?
                this.orthographicCamera :
                this.thirdPersonCamera;

        this.isOrthographicEnabled ?
            car.removeCamera(this.thirdPersonCamera) :
            car.attachCamera(this.thirdPersonCamera);

        renderer.render(scene, camera);
    }

    public update(carPosition: Vector3): void {
        this.orthographicCamera.position.set(carPosition.x, this.orthographicCamera.position.y, carPosition.z);
    }

    public onResize(aspectRatio: number): void {
        this.thirdPersonCamera.aspect = aspectRatio;
        this.thirdPersonCamera.updateProjectionMatrix();
    }

    public zoom(isZooming: boolean): void {
        const camera: PerspectiveCamera | OrthographicCamera =
            this.isOrthographicEnabled ?
                this.orthographicCamera :
                this.thirdPersonCamera;

        const direction: number = isZooming ? 1 : -1;
        const newZoom: number = camera.zoom + ZOOM_FACTOR_INCREMENT * direction;
        if (newZoom < ZOOM_LIMIT && newZoom > UNZOOM_LIMIT) {
            camera.zoom = newZoom;
            camera.updateProjectionMatrix();
        }
    }

    public switchView(): void {
        this.isOrthographicEnabled = !this.isOrthographicEnabled;
    }
}
