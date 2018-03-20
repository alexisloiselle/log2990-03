import { OrthographicCamera, Vector3, Scene, WebGLRenderer } from "three";
import { Injectable } from "@angular/core";

const INITIAL_HEIGHT: number = 90;
const NEAR_CLIPPING_PLANE: number = 1;
const FAR_CLIPPING_PLANE: number = 1000;
const ZOOM_FACTOR_INCREMENT: number = 0.01;
const ZOOM_LIMIT: number = 2;
const UNZOOM_LIMIT: number = 0.6;
const EDGE: number = 45;

@Injectable()
export class CameraService {

    public orthographicCamera: OrthographicCamera;

    public constructor() {
        this.orthographicCamera = new OrthographicCamera(
            -window.innerWidth / EDGE,
            window.innerWidth / EDGE,
            window.innerHeight / EDGE,
            -window.innerHeight / EDGE,
            NEAR_CLIPPING_PLANE,
            FAR_CLIPPING_PLANE
        );
    }

    public createCamera(position: Vector3, scene: Scene): void {
        this.orthographicCamera.position.set(0, INITIAL_HEIGHT, 0);
        this.orthographicCamera.lookAt(position);
        scene.add(this.orthographicCamera);
    }

    public render(scene: Scene, renderer: WebGLRenderer): void {
        renderer.render(scene, this.orthographicCamera);
    }

    public update(carPosition: Vector3): void {
        this.orthographicCamera.position.set(carPosition.x, this.orthographicCamera.position.y, carPosition.z);
        this.orthographicCamera.updateProjectionMatrix();
    }

    public zoom(isZooming: boolean): void {
        const direction: number = isZooming ? 1 : -1;
        const newZoom: number = this.orthographicCamera.zoom + ZOOM_FACTOR_INCREMENT * direction;
        if (newZoom < ZOOM_LIMIT && newZoom > UNZOOM_LIMIT) {
            this.orthographicCamera.zoom = newZoom;
            this.orthographicCamera.updateProjectionMatrix();
        }
    }
}
