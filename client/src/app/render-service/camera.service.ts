import { OrthographicCamera, Vector3, Scene, WebGLRenderer } from "three";
import { Injectable } from "@angular/core";

const INITIAL_HEIGHT: number = 90;
const NEAR_CLIPPING_PLANE: number = 1;
const FAR_CLIPPING_PLANE: number = 1000;

@Injectable()
export class CameraService {

    public orthographicCamera: OrthographicCamera;

    public constructor() {
        this.orthographicCamera = new OrthographicCamera(
            window.innerWidth / -50,
            window.innerWidth / 50,
            window.innerHeight / 50,
            window.innerHeight / -50,
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
}
