import { Injectable } from "@angular/core";
import * as THREE from "three";
import { RaceTrack } from "../race/raceTrack";
import { PointCoordinates } from "../race/track-editor/canvas/point-coordinates";

const CONVERTING_FACTOR: number = 1;
const NUMBER_FIVE: number = 5;
const NUMBER_TEN: number = 10;
const NUMBER_HUN: number = 100;
const NUMBER_EIGHT_HUN: number = 800;
const APPROX_ZERO_MINUS: number = -0.001;
const BLACK: number = 0x000000;
const WHITE: number = 0xFFFFFF;

const POINT1_X: number = 329; const POINT1_Y: number = 114;
const POINT2_X: number = 250; const POINT2_Y: number = 347;
const POINT3_X: number = 136; const POINT3_Y: number = 167;

@Injectable()
export class RenderTrackService {
    public race: RaceTrack;
    public curve: THREE.CatmullRomCurve3;
    public vectorPoints: THREE.Vector3[] = [];
    public geometry: THREE.BufferGeometry;
    public material: THREE.LineBasicMaterial;
    public curveObject: THREE.Line;
    public segment: Segment[];
    public array: PointCoordinates[] = [];

    public constructor() {
        this.segment = [];
    }

    public buildTrack(race: RaceTrack): THREE.Mesh[] {
        const plane: THREE.Mesh[] = [];
        this.generateSegments(race.points);
        for (let i: number = 0; i < this.segment.length; i++) {
            const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(NUMBER_TEN, this.segment[i].length());
            let material: THREE.MeshBasicMaterial;

            // whyyyy
            if (i === 0) {
                material = new THREE.MeshBasicMaterial({ color: WHITE, side: THREE.DoubleSide });
            } else if (i === 1) {
                material = new THREE.MeshBasicMaterial({ color: WHITE, side: THREE.DoubleSide });
            } else if (i === 2) {
                material = new THREE.MeshBasicMaterial({ color: WHITE, side: THREE.DoubleSide });
            } else {
                material = new THREE.MeshBasicMaterial({ color: WHITE, side: THREE.DoubleSide });
            }
            plane.push(new THREE.Mesh(geometry, material));
            plane[plane.length - 1].rotation.z = -this.segment[i].angle;
            plane[plane.length - 1].rotation.x = Math.PI / 2;
            plane[plane.length - 1].position.x = (this.segment[i].firstPoint.y + this.segment[i].lastPoint.y) / 2;
            plane[plane.length - 1].position.z = (this.segment[i].firstPoint.x + this.segment[i].lastPoint.x) / 2;
        }

        return plane;
    }
    public generateDefaultTrack(): RaceTrack {
        const point1: PointCoordinates = new PointCoordinates(POINT1_X, POINT1_Y);
        const point2: PointCoordinates = new PointCoordinates(POINT2_X, POINT2_Y);
        const point3: PointCoordinates = new PointCoordinates(POINT3_X, POINT3_Y);
        const point4: PointCoordinates = new PointCoordinates(POINT1_X, POINT1_Y);
        this.array.push(point1);
        this.array.push(point2);
        this.array.push(point3);
        this.array.push(point4);

        return (new RaceTrack("Track", "Default Track", 0, this.array));
    }

    public generateSegments(pointArray: PointCoordinates[]): void {
        for (let i: number = 0; i < pointArray.length - 1; i++) {
            const firstPoint: PointCoordinates = new PointCoordinates(0, 0);
            firstPoint.x = (pointArray[i].x - pointArray[0].x) * CONVERTING_FACTOR;
            firstPoint.y = (pointArray[i].y - pointArray[0].y) * CONVERTING_FACTOR;

            const lastPoint: PointCoordinates = new PointCoordinates(0, 0);
            lastPoint.x = (pointArray[i + 1].x - pointArray[0].x) * CONVERTING_FACTOR;
            lastPoint.y = (pointArray[i + 1].y - pointArray[0].y) * CONVERTING_FACTOR;

            this.segment.push(new Segment(firstPoint, lastPoint));
        }
    }

    public genererSurfaceHorsPiste(): THREE.Mesh {
        let hPSurface: THREE.Mesh;
        const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(NUMBER_EIGHT_HUN, NUMBER_EIGHT_HUN);
        let material: THREE.MeshBasicMaterial;
        material = new THREE.MeshBasicMaterial({ color: BLACK, side: THREE.DoubleSide });
        hPSurface = new THREE.Mesh(geometry, material);
        hPSurface.position.y = APPROX_ZERO_MINUS;
        hPSurface.rotation.z = Math.PI / 2;
        hPSurface.rotation.x = Math.PI / 2;
        hPSurface.position.x = 0;
        hPSurface.position.z = 0;

        return hPSurface;

    }

    public genererCircle(): THREE.Mesh[] {
        const circle: THREE.Mesh[] = [];
        for (let i: number = 0; i < this.segment.length; i++) {
            const geometry: THREE.CircleGeometry = new THREE.CircleGeometry(NUMBER_FIVE, NUMBER_HUN);
            let material: THREE.MeshBasicMaterial;
            material = new THREE.MeshBasicMaterial({ color: WHITE, side: THREE.DoubleSide });
            circle.push(new THREE.Mesh(geometry, material));
            circle[i].rotation.z = Math.PI / 2;
            circle[i].rotation.x = Math.PI / 2;
            circle[i].position.z = this.segment[i].firstPoint.x;
            circle[i].position.x = this.segment[i].firstPoint.y;
        }

        return circle;
    }
}

export class Segment {
    public firstPoint: PointCoordinates;
    public lastPoint: PointCoordinates;
    public angle: number;

    public constructor(firstPoint: PointCoordinates, lastPoint: PointCoordinates) {
        this.firstPoint = firstPoint;
        this.lastPoint = lastPoint;
        this.angle = this.firstPoint.getAngle(this.lastPoint);
    }

    public length(): number {
        return this.firstPoint.getDistance(this.lastPoint);
    }

}
