import { TestBed, inject } from "@angular/core/testing";
import { RenderTrackService } from "./render-track.service";
import { TrackService } from "../track.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import * as THREE from "three";
// tslint:disable-next-line:no-duplicate-imports
import {Vector2} from "three";

const NUMBER_OF_CARS: number = 4;
const APPROX_ZERO_MINUS: number = -0.001;
const NUMBER_EIGHT_HUN: number = 800;
const DUMMY_NUMBER_THREE: number = 3;
const DUMMY_NUMBER_FOUR: number = 4;
const DUMMY_NUMBER_FIVE: number = 5;
const EXPECTED_RESULT_X: number = 0.8944271909999159;
const EXPECTED_RESULT_Z: number = 0.4472135954999579;
const EXPECTED_RESULT_RATIO: number = 1.5707963267948966;

describe("RenderTrackService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [RenderTrackService, TrackService]
        });
    });

    it("should be created", inject([RenderTrackService], (service: RenderTrackService) => {
        expect(service).toBeTruthy();
    }));

    it("should create a random array with numbers from 1 to 4", () => {
        const renderTrackService: RenderTrackService = new RenderTrackService(null);
        const positionNumbers: Array<number> = renderTrackService.generateRandomCarPositions(NUMBER_OF_CARS);

        // We first check if the size of the arrays is correct
        let positionNumbersOk: boolean = positionNumbers.length === NUMBER_OF_CARS;

        // Then we check if the numbers are in the correct range
        for (const n of positionNumbers) {
            if (n > NUMBER_OF_CARS || n < 1) {
                positionNumbersOk = false;
                break;
            }
        }

        expect(positionNumbersOk).toBe(true);
    });

    it("should generate an off track surface", inject([RenderTrackService], (service: RenderTrackService) => {
        const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(NUMBER_EIGHT_HUN, NUMBER_EIGHT_HUN);
        const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial;
        const hPSurfaceTest: THREE.Mesh = new THREE.Mesh(geometry, material);
        hPSurfaceTest.position.x = 0;
        hPSurfaceTest.position.z = 0;
        hPSurfaceTest.position.y = APPROX_ZERO_MINUS;
        let hPSurface: THREE.Mesh;
        hPSurface = service.generateOffTrackSurface();
        expect(hPSurface.position.x === hPSurfaceTest.position.x
        && hPSurface.position.y === hPSurfaceTest.position.y
        && hPSurface.position.z === hPSurfaceTest.position.z).toBe(true);
    }));

    it("should generate a circle for path corners", inject([RenderTrackService], (service: RenderTrackService) => {
        let circle: THREE.Mesh[];
        let circle2: THREE.Mesh[];
        service.segments = [];
        const vector1: Vector2 = new Vector2(1, 1);
        const vector2: Vector2 = new Vector2(1, 2);
        const segment: THREE.LineCurve = new THREE.LineCurve(vector1, vector2);
        service.segments.push(segment);
        circle = service.patchTrack(DUMMY_NUMBER_FIVE);
        circle2 = service.patchTrack(DUMMY_NUMBER_THREE);
        expect(circle === circle2).toBe(false);
    }));

    it("should calculate first Segment Ratio Of X On Hypotenuse", inject([RenderTrackService], (service: RenderTrackService) => {
        service.segments = [];
        const vector1: Vector2 = new Vector2(1, 1);
        const vector2: Vector2 = new Vector2(1, 2);
        const segment: THREE.LineCurve = new THREE.LineCurve(vector1, vector2);
        service.segments.push(segment);
        service.firstSegmentRatioOfXOnHypotenuse();
        expect(service.firstSegmentRatioOfXOnHypotenuse() === EXPECTED_RESULT_X).toBe(true);
    }));

    it("should calculate first Segment Ratio Of Z On Hypotenus", inject([RenderTrackService], (service: RenderTrackService) => {
        service.segments = [];
        const vector1: Vector2 = new Vector2(1, 1);
        const vector2: Vector2 = new Vector2(1, 2);
        const segment: THREE.LineCurve = new THREE.LineCurve(vector1, vector2);
        service.segments.push(segment);
        service.firstSegmentRatioOfZOnHypotenuse();
        expect(service.firstSegmentRatioOfZOnHypotenuse() === EXPECTED_RESULT_Z).toBe(true);
    }));

    it("should calculate square Root", inject([RenderTrackService], (service: RenderTrackService) => {
        expect(service.squareRootAddition(DUMMY_NUMBER_THREE, DUMMY_NUMBER_FOUR) === DUMMY_NUMBER_FIVE).toBe(true);
    }));

    it("should get Rotation of Arc Tan", inject([RenderTrackService], (service: RenderTrackService) => {
        service.segments = [];
        const vector1: Vector2 = new Vector2(1, 1);
        const vector2: Vector2 = new Vector2(1, 2);
        const segment: THREE.LineCurve = new THREE.LineCurve(vector1, vector2);
        service.segments.push(segment);
        expect(service.getRotationArcTan(segment) === EXPECTED_RESULT_RATIO).toBe(true);
    }));
});
