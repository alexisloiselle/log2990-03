import { Injectable } from "@angular/core";
import * as THREE from "three";
import { RaceTrack } from "../race/raceTrack";
import { BotCar } from "../race/car/bot-car";
import { Car } from "../race/car/car";

const CONVERTING_FACTOR: number = 1;
const NUMBER_HUN: number = 100;
const NUMBER_EIGHT_HUN: number = 800;
const APPROX_ZERO_MINUS: number = -0.001;
const BLACK: number = 0x000000;
const WHITE: number = 0xFFFFFF;
const STARTINGLINEWIDTH: number = 3;

const STARTINGLINEDISTANCE: number = 30;

const FIRST: number = 1;
const SECOND: number = 2;
const THIRD: number = 3;
const FOURTH: number = 4;

const POSITIONCARAHEAD: number = 25;
const POSITIONCARBEHIND: number = 20;

const POSITIONOFFSET: number = 2;

const POINT1_X: number = 329; const POINT1_Y: number = 114;
const POINT2_X: number = 250; const POINT2_Y: number = 347;
const POINT3_X: number = 136; const POINT3_Y: number = 167;

@Injectable()
export class RenderTrackService {
    public curve: THREE.CatmullRomCurve3;
    public vectorPoints: THREE.Vector3[] = [];
    public geometry: THREE.BufferGeometry;
    public material: THREE.LineBasicMaterial;
    public curveObject: THREE.Line;
    public segments: THREE.LineCurve[] = [];
    public array: THREE.Vector2[] = [];

    public buildTrack(track: RaceTrack): THREE.Mesh[] {
        const plane: THREE.Mesh[] = [];
        const trackShape: THREE.Shape = new THREE.Shape();
        this.generateSegments(track.points);
        for (const segment of this.segments) {
            const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(track.width, segment.getLength());
            let material: THREE.MeshBasicMaterial;

            material = new THREE.MeshBasicMaterial({ color: WHITE, side: THREE.DoubleSide });

            plane.push(new THREE.Mesh(geometry, material));

            trackShape.moveTo(segment.v1.x, segment.v1.y);

            plane[plane.length - 1].rotation.z = -Math.atan((segment.v2.y - segment.v1.y) /
                                                            (segment.v2.x - segment.v1.x));
            plane[plane.length - 1].rotation.x = Math.PI / 2;

            plane[plane.length - 1].position.x = (segment.v1.y + segment.v2.y) / 2;
            plane[plane.length - 1].position.z = (segment.v1.x + segment.v2.x) / 2;
        }

        return plane;
    }

    public generateDefaultTrack(): RaceTrack {
        const point1: THREE.Vector2 = new THREE.Vector2(POINT1_X, POINT1_Y);
        const point2: THREE.Vector2 = new THREE.Vector2(POINT2_X, POINT2_Y);
        const point3: THREE.Vector2 = new THREE.Vector2(POINT3_X, POINT3_Y);
        const point4: THREE.Vector2 = new THREE.Vector2(POINT1_X, POINT1_Y);
        this.array.push(point1);
        this.array.push(point2);
        this.array.push(point3);
        this.array.push(point4);

        return new RaceTrack("Track", "Default Track", 0, this.array);
    }

    public generateSegments(pointArray: THREE.Vector2[]): void {
        for (let i: number = 0; i < pointArray.length - 1; i++) {
            const v1: THREE.Vector2 = new THREE.Vector2(0, 0);
            v1.x = (pointArray[i].x - pointArray[0].x) * CONVERTING_FACTOR;
            v1.y = (pointArray[i].y - pointArray[0].y) * CONVERTING_FACTOR;

            const v2: THREE.Vector2 = new THREE.Vector2(0, 0);
            v2.x = (pointArray[i + 1].x - pointArray[0].x) * CONVERTING_FACTOR;
            v2.y = (pointArray[i + 1].y - pointArray[0].y) * CONVERTING_FACTOR;

            this.segments.push(new THREE.LineCurve(v1, v2));
        }
    }

    public getFirstSegment(): THREE.LineCurve {
        return this.segments[0];
    }

    public generateOffTrackSurface(): THREE.Mesh {
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

    public patchTrack(trackWidth: number): THREE.Mesh[] {
        const circle: THREE.Mesh[] = [];
        for (let i: number = 0; i < this.segments.length; i++) {
            const geometry: THREE.CircleGeometry = new THREE.CircleGeometry(trackWidth / 2, NUMBER_HUN);
            let material: THREE.MeshBasicMaterial;
            material = new THREE.MeshBasicMaterial({ color: WHITE, side: THREE.DoubleSide });
            circle.push(new THREE.Mesh(geometry, material));
            circle[i].rotation.z = Math.PI / 2;
            circle[i].rotation.x = Math.PI / 2;
            circle[i].position.z = this.segments[i].v1.x;
            circle[i].position.x = this.segments[i].v1.y;
        }

        return circle;
    }

    public createStartingLine(trackWidth: number): THREE.Mesh {
        let startingLine: THREE.Mesh;

        const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(trackWidth, STARTINGLINEWIDTH);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: BLACK, side: THREE.DoubleSide });
        startingLine = new THREE.Mesh(geometry, material);

        startingLine.rotation.z = -Math.atan((this.segments[0].v2.y - this.segments[0].v1.y) /
                                             (this.segments[0].v2.x - this.segments[0].v1.x));
        startingLine.rotation.x = Math.PI / 2;

        startingLine.position.x = this.segments[0].v2.y /
                                            Math.sqrt(Math.pow(this.segments[0].v2.x, 2) +
                                                      Math.pow(this.segments[0].v2.y, 2)) * STARTINGLINEDISTANCE;
        startingLine.position.z = this.segments[0].v2.x /
                                            Math.sqrt(Math.pow(this.segments[0].v2.x, 2) +
                                                      Math.pow(this.segments[0].v2.y, 2)) * STARTINGLINEDISTANCE;
        // tslint:disable-next-line:no-magic-numbers
        startingLine.position.y = 0.2;

        return startingLine;
    }

    public positionCars(playerCar: Car, botCars: Array<BotCar>): void {
        const positionNumbers: Array<number> = this.generateRandomCarPositions(botCars.length + 1);
        this.placeCars(playerCar, positionNumbers[0]);
        for (const botCar of botCars) {
            this.placeCars(botCar, positionNumbers[botCars.indexOf(botCar) + 1]);
        }
    }

    public placeCars(car: Car, position: number): void {
        const ratioX: number = this.segments[0].v2.y /
                  Math.sqrt(Math.pow(this.segments[0].v2.x, 2) +
                            Math.pow(this.segments[0].v2.y, 2));
        const ratioY: number = this.segments[0].v2.x /
                  Math.sqrt(Math.pow(this.segments[0].v2.x, 2) +
                            Math.pow(this.segments[0].v2.y, 2));
        const angle: number = Math.acos(ratioX) + Math.PI;
        switch (position) {
            case FIRST :
                car.mesh.position.x = ratioX * POSITIONCARAHEAD + Math.sin(angle) * POSITIONOFFSET;
                car.mesh.position.z = ratioY * POSITIONCARAHEAD + Math.cos(angle) * POSITIONOFFSET;
                break;
            case SECOND :
                car.mesh.position.x = ratioX * POSITIONCARAHEAD - Math.sin(angle) * POSITIONOFFSET;
                car.mesh.position.z = ratioY * POSITIONCARAHEAD - Math.cos(angle) * POSITIONOFFSET;
                break;
            case THIRD :
                car.mesh.position.x = ratioX * POSITIONCARBEHIND + Math.sin(angle) * POSITIONOFFSET;
                car.mesh.position.z = ratioY * POSITIONCARBEHIND + Math.cos(angle) * POSITIONOFFSET;
                break;
            case FOURTH :
                car.mesh.position.x = ratioX * POSITIONCARBEHIND -  Math.sin(angle) * POSITIONOFFSET;
                car.mesh.position.z = ratioY * POSITIONCARBEHIND -  Math.cos(angle) * POSITIONOFFSET;
                break;
            default:
            break;
        }
    }

    public generateRandomCarPositions(numberOfCars: number): Array<number> {
        const positionNumbers: Array<number> = [];
        while (positionNumbers.length < numberOfCars) {
            if (positionNumbers.length === 0) {
                positionNumbers.push(Math.floor(Math.random() * numberOfCars) + 1);
            } else if (positionNumbers.length === numberOfCars - 1) {
                let temp: number = 0;
                for (const n of positionNumbers) {
                    temp += n;
                }
                let sum: number = 0;
                for (let i: number = 0; i <= numberOfCars; i++) {
                    sum += i;
                }
                positionNumbers.push(sum - temp);
            } else {
                const temp2: number = Math.floor(Math.random() * numberOfCars) + 1;
                let alreadyInArray: boolean = false;
                for (const n of positionNumbers) {
                    if (n === temp2) {
                        alreadyInArray = true;
                    }
                }
                if (!alreadyInArray) {
                    positionNumbers.push(temp2);
                }
            }
        }

        return positionNumbers;
    }

}
