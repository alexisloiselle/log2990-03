import { Injectable } from "@angular/core";
import * as THREE from "three";
import {RaceTrack} from "../race/raceTrack";
import { PointCoordinates } from "../race/track-editor/canvas/point-coordinates";
import { Car } from "../race/car/car";

const CONVERTING_FACTOR: number = 1;
const DIVIDING_FACTOR: number = 2;
const NUMBER_TEN: number = 10;
const NUMBER_HUNDRED: number = 100;
const NUMBER_TWENTY: number = 20;
const WHITE: number = 0xFFFFFF;
const BLACK: number = 0x000000;
const NUMBER_TINY_MINUS: number = -0.001;
const NUMBER_HIEGHT_HUNDRED: number = 800;

@Injectable()
export class RenderTrackService {
    public race: RaceTrack;
    public curve: THREE.CatmullRomCurve3;
    public vectorPoints: THREE.Vector3[] = [];
    public geometry: THREE.BufferGeometry;
    public material: THREE.LineBasicMaterial;
    public curveObject: THREE.Line;
    public segment: Segment[];

    public constructor() {
        this.segment = [];
    }

    public buildTrack(race: RaceTrack): THREE.Mesh[] {
        const plane: THREE.Mesh[] = [];
        this.generateSegments(race.points);

        for (const i of this.segment) {

            const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry( NUMBER_TWENTY, i.length());
            let material: THREE.MeshBasicMaterial;
            material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
            plane.push(new THREE.Mesh( geometry, material ));

            plane[plane.length - 1].rotation.z = -(i.angle);
            plane[plane.length - 1].rotation.x = Math.PI / DIVIDING_FACTOR;

            plane[plane.length - 1].position.x =  (i.firstPoint.Y + i.lastPoint.Y) / DIVIDING_FACTOR;
            plane[plane.length - 1].position.z = (i.firstPoint.X + i.lastPoint.X) / DIVIDING_FACTOR;
        }

        return plane;
    }

    public generateSegments(pointArray: PointCoordinates[]): void {
        for (let i: number = 0; i < pointArray.length - 1; i++) {
            const firstPoint: PointCoordinates = new PointCoordinates(0, 0);
            firstPoint.X =  (pointArray[i].X - pointArray[0].X) * CONVERTING_FACTOR;
            firstPoint.Y =  (pointArray[i].Y - pointArray[0].Y) * CONVERTING_FACTOR;

            const lastPoint: PointCoordinates = new PointCoordinates(0, 0);
            lastPoint.X =  (pointArray[i + 1].X - pointArray[0].X) * CONVERTING_FACTOR;
            lastPoint.Y =  (pointArray[i + 1].Y - pointArray[0].Y) * CONVERTING_FACTOR;

            this.segment.push(new Segment(firstPoint, lastPoint));
        }
    }

    public orienterCar(_car: Car): void {
        _car.rotation.y = this.segment[0].angle - Math.PI / DIVIDING_FACTOR;
    }

    public genererateOffTrackSurface(): THREE.Mesh {
        const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry( NUMBER_HIEGHT_HUNDRED , NUMBER_HIEGHT_HUNDRED);
        let material: THREE.MeshBasicMaterial;
        material = new THREE.MeshBasicMaterial( {color: WHITE, side: THREE.DoubleSide} );
        const hpSurface: THREE.Mesh = new THREE.Mesh( geometry, material);

        hpSurface.position.y = NUMBER_TINY_MINUS;
        hpSurface.rotation.z = Math.PI / DIVIDING_FACTOR;
        hpSurface.rotation.x = Math.PI / DIVIDING_FACTOR;
        hpSurface.position.x = 0;
        hpSurface.position.z = 0;

        return hpSurface;
    }

    public genererateCircle(): THREE.Mesh[] {
        const circle: THREE.Mesh[] = [];

        for (let i: number = 0; i < this.segment.length; i++) {
            const geometry: THREE.CircleGeometry = new THREE.CircleGeometry( NUMBER_TEN, NUMBER_HUNDRED);
            let material: THREE.MeshBasicMaterial;
            material = new THREE.MeshBasicMaterial( {color: BLACK, side: THREE.DoubleSide} );
            circle.push(new THREE.Mesh( geometry, material));
            circle[i].rotation.z = Math.PI / DIVIDING_FACTOR;
            circle[i].rotation.x = Math.PI / DIVIDING_FACTOR;
            circle[i].position.z = this.segment[i].firstPoint.X;
            circle[i].position.x = this.segment[i].firstPoint.Y;
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
