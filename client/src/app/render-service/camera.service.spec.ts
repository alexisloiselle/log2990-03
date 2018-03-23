import { TestBed, inject } from "@angular/core/testing";
import { } from "jasmine";

import { CameraService } from "./camera.service";
import { Car } from "../race/car/car";
import { Scene } from "three";
import { RenderService } from "./render.service";

const INITIAL_HEIGHT_ORTHO: number = 90;
const INITIAL_Z_THIRDPERSON: number = 10;
const INITIAL_HEIGHT_THIRDPERSON: number = 4;
const ZOOM_LIMIT: number = 2;
const UNZOOM_LIMIT: number = 0.6;

describe("CameraService", () => {
    let cameraService: CameraService;
    let car: Car;
    let scene: Scene;

    beforeEach(async (done: Function) => {
        TestBed.configureTestingModule({
            providers: [CameraService]
        });
        cameraService = new CameraService();
        scene = new Scene();
        car = new Car();
        car.init(await RenderService.loadCar("../../assets/camero/camero-2010-low-poly.json"));
        cameraService.createCameras(car.Position, 2, scene);

        done();
    });

    describe("camera", () => {
        it("should be created", inject([CameraService], (service: CameraService) => {
            expect(cameraService).toBeTruthy();
        }));

        it("cameras should be created", inject([CameraService], (service: CameraService) => {
            expect(cameraService.orthographicCamera).toBeTruthy();
            expect(cameraService.thirdPersonCamera).toBeTruthy();
        }));

        it("orthographic should be at right position", inject([CameraService], (service: CameraService) => {
            expect(cameraService.orthographicCamera.position.x).toEqual(car.Position.x);
            expect(cameraService.orthographicCamera.position.z).toEqual(car.Position.z);
            expect(cameraService.orthographicCamera.position.y).toEqual(INITIAL_HEIGHT_ORTHO);
        }));

        it("thirdPerson should be at right position", inject([CameraService], (service: CameraService) => {
            expect(cameraService.thirdPersonCamera.position.x).toEqual(car.Position.x);
            expect(cameraService.thirdPersonCamera.position.y).toEqual(INITIAL_HEIGHT_THIRDPERSON);
            expect(cameraService.thirdPersonCamera.position.z).toEqual(INITIAL_Z_THIRDPERSON);
        }));

        it("orthographic camera should follow car", inject([CameraService], (service: CameraService) => {
            expect(cameraService.orthographicCamera.position.x).toEqual(car.position.x);
            expect(cameraService.orthographicCamera.position.z).toEqual(car.position.z);
            expect(cameraService.orthographicCamera.position.y).toEqual(INITIAL_HEIGHT_ORTHO);

            // tslint:disable-next-line:no-magic-numbers
            car.position.set(200, 0, 100);
            cameraService.update(car.position);

            expect(cameraService.orthographicCamera.position.x).toEqual(car.position.x);
            expect(cameraService.orthographicCamera.position.z).toEqual(car.position.z);
            expect(cameraService.orthographicCamera.position.y).toEqual(INITIAL_HEIGHT_ORTHO);
        }));

        it("third person camera should follow car", inject([CameraService], (service: CameraService) => {
            expect(cameraService.IsOrthographicEnabled).toEqual(true);
            cameraService.switchView(car);
            expect(cameraService.IsOrthographicEnabled).toEqual(false);

            expect(cameraService.thirdPersonCamera.position.x).toEqual(car.Position.x);
            expect(cameraService.thirdPersonCamera.position.y - INITIAL_HEIGHT_THIRDPERSON).toEqual(car.Position.y);
            expect(cameraService.thirdPersonCamera.position.z - INITIAL_Z_THIRDPERSON).toEqual(car.Position.z);

            // tslint:disable-next-line:no-magic-numbers
            car.position.set(200, 0, 100);

            expect(cameraService.thirdPersonCamera.position.x).toEqual(car.Position.x);
            expect(cameraService.thirdPersonCamera.position.y - INITIAL_HEIGHT_THIRDPERSON).toEqual(car.Position.y);
            expect(cameraService.thirdPersonCamera.position.z - INITIAL_Z_THIRDPERSON).toEqual(car.Position.z);
        }));
    });

    describe("zoom", () => {
        it("zoom should work", inject([CameraService], (service: CameraService) => {
            expect(cameraService.IsOrthographicEnabled).toEqual(true);

            const initialZoom: number = cameraService.orthographicCamera.zoom;
            cameraService.zoom(true);
            expect(cameraService.orthographicCamera.zoom).toBeGreaterThan(initialZoom);
        }));

        it("unzoom should work", inject([CameraService], (service: CameraService) => {
            expect(cameraService.IsOrthographicEnabled).toEqual(true);

            const initialZoom: number = cameraService.orthographicCamera.zoom;
            cameraService.zoom(false);
            expect(cameraService.orthographicCamera.zoom).toBeLessThan(initialZoom);
        }));

        it("shouldn't be outside of limits", inject([CameraService], (service: CameraService) => {
            expect(cameraService.IsOrthographicEnabled).toEqual(true);

            cameraService.orthographicCamera.zoom = ZOOM_LIMIT;
            cameraService.zoom(true);
            expect(cameraService.orthographicCamera.zoom).toEqual(ZOOM_LIMIT);

            cameraService.orthographicCamera.zoom = UNZOOM_LIMIT;
            cameraService.zoom(false);
            expect(cameraService.orthographicCamera.zoom).toEqual(UNZOOM_LIMIT);
        }));
    });
});
