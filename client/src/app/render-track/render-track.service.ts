import { Injectable } from "@angular/core";
import * as THREE from "three";
import { RaceTrack } from "../race/raceTrack";
import { BotCar } from "../race/car/bot-car";
import { Car } from "../race/car/car";

const NUMBER_HUN: number = 100;
const NUMBER_EIGHT_HUN: number = 800;
const APPROX_ZERO_MINUS: number = -0.001;
const BLACK: number = 0x000000;
const WHITE: number = 0xFFFFFF;
const STARTING_LINE_WIDTH: number = 3;
const OFF_SET_FACTOR: number = 0.2;

const STARTING_LINE_DISTANCE: number = 30;

const FIRST: number = 1;
const SECOND: number = 2;
const THIRD: number = 3;
const FOURTH: number = 4;

const POSITIONCARAHEAD: number = 25;
const POSITIONCARBEHIND: number = 20;

const POSITIONOFFSET: number = 2;

@Injectable()
export class RenderTrackService {
    public segments: THREE.LineCurve[] = [];

    public buildTrack(track: RaceTrack): THREE.Mesh[] {
        const plane: THREE.Mesh[] = [];
        this.segments = track.segments;
        for (const segment of this.segments) {
            const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(track.width, segment.getLength());
            const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: WHITE, side: THREE.DoubleSide });
            plane.push(new THREE.Mesh(geometry, material));
            plane[plane.length - 1].rotation.z = -(this.getRotationArcTan(segment));
            plane[plane.length - 1].rotation.x = Math.PI / 2;
            plane[plane.length - 1].position.x = (segment.v1.y + segment.v2.y) / 2;
            plane[plane.length - 1].position.z = (segment.v1.x + segment.v2.x) / 2;
        }

        return plane;
    }

    // TODO: get from mongodb instead OU disable best time
    public generateDefaultTrack(): RaceTrack {
        const defaultTrackPoints: THREE.Vector2[] = [];
        // tslint:disable-next-line:no-magic-numbers
        defaultTrackPoints.push(new THREE.Vector2(329, 114));
        // tslint:disable-next-line:no-magic-numbers
        defaultTrackPoints.push(new THREE.Vector2(250, 347));
        // tslint:disable-next-line:no-magic-numbers
        defaultTrackPoints.push(new THREE.Vector2(136, 167));
        defaultTrackPoints.push(defaultTrackPoints[0]);

        return new RaceTrack(
            "Track",
            "Default Track",
            0,
            defaultTrackPoints
        );
    }

    public generateOffTrackSurface(): THREE.Mesh {
        const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(NUMBER_EIGHT_HUN, NUMBER_EIGHT_HUN);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: BLACK, side: THREE.DoubleSide });
        const hPSurface: THREE.Mesh = new THREE.Mesh(geometry, material);

        hPSurface.rotation.z = Math.PI / 2;
        hPSurface.rotation.x = Math.PI / 2;

        hPSurface.position.x = 0;
        hPSurface.position.z = 0;
        hPSurface.position.y = APPROX_ZERO_MINUS;

        return hPSurface;
    }

    public patchTrack(trackWidth: number): THREE.Mesh[] {
        const circle: THREE.Mesh[] = [];
        for (let i: number = 0; i < this.segments.length; i++) {
            const geometry: THREE.CircleGeometry = new THREE.CircleGeometry(trackWidth / 2, NUMBER_HUN);
            const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: WHITE, side: THREE.DoubleSide });
            circle.push(new THREE.Mesh(geometry, material));
            circle[i].rotation.z = Math.PI / 2;
            circle[i].rotation.x = Math.PI / 2;
            circle[i].position.z = this.segments[i].v1.x;
            circle[i].position.x = this.segments[i].v1.y;
        }

        return circle;
    }

    public createStartingLine(trackWidth: number): THREE.Mesh {
        const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(trackWidth, STARTING_LINE_WIDTH);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: BLACK, side: THREE.DoubleSide });
        const startingLine: THREE.Mesh = new THREE.Mesh(geometry, material);
        startingLine.rotation.z = -(this.getRotationArcTan(this.segments[0]));
        startingLine.rotation.x = Math.PI / 2;
        startingLine.position.x = this.firstSegmentRatioOfXOnHypotenuse() * STARTING_LINE_DISTANCE;
        startingLine.position.z = this.firstSegmentRatioOfZOnHypotenuse() * STARTING_LINE_DISTANCE;
        startingLine.position.y = OFF_SET_FACTOR;

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
        const ratioX: number = this.firstSegmentRatioOfXOnHypotenuse();
        const ratioY: number = this.firstSegmentRatioOfZOnHypotenuse();
        const angle: number = this.getAngle(ratioX);
        switch (position) {
            case FIRST:
                this.calulateCarPositionPositive(car, ratioX, POSITIONCARAHEAD, ratioY, angle);
                break;
            case SECOND:
                this.calulateCarPositionNegative(car, ratioX, POSITIONCARAHEAD, ratioY, angle);
                break;
            case THIRD:
                this.calulateCarPositionPositive(car, ratioX, POSITIONCARBEHIND, ratioY, angle);
                break;
            case FOURTH:
                this.calulateCarPositionNegative(car, ratioX, POSITIONCARBEHIND, ratioY, angle);
                break;
            default:
                break;
        }
    }

    public generateRandomCarPositions(numberOfCars: number): Array<number> {
        const positionNumbers: Array<number> = [];
        while (positionNumbers.length < numberOfCars) {
            const temp2: number = this.generateRandomNumber(numberOfCars);
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

        return positionNumbers;
    }
    private calulateCarPositionPositive(car: Car, ratioX: number, position: number, ratioY: number, angle: number): void {
        car.mesh.position.x = ratioX * position + Math.sin(angle) * POSITIONOFFSET;
        car.mesh.position.z = ratioY * position + Math.cos(angle) * POSITIONOFFSET;
    }
    private calulateCarPositionNegative(car: Car, ratioX: number, position: number, ratioY: number, angle: number): void {
        car.mesh.position.x = ratioX * position - Math.sin(angle) * POSITIONOFFSET;
        car.mesh.position.z = ratioY * position - Math.cos(angle) * POSITIONOFFSET;
    }

    private firstSegmentRatioOfXOnHypotenuse(): number {
        return (this.segments[0].v2.y /
            this.squareRootAddition(this.segments[0].v2.x, this.segments[0].v2.y));
    }
    private firstSegmentRatioOfZOnHypotenuse(): number {
        return (this.segments[0].v2.x /
            this.squareRootAddition(this.segments[0].v2.x, this.segments[0].v2.y));
    }
    private squareRootAddition(firstNumber: number, secondNumber: number): number {
        return (Math.sqrt(Math.pow(firstNumber, 2) +
            Math.pow(secondNumber, 2)));
    }
    private getAngle(ratio: number): number {
        return (Math.acos(ratio) + Math.PI);
    }
    private getRotationArcTan(segment: THREE.LineCurve): number {
        return (Math.atan((segment.v2.y - segment.v1.y) / (segment.v2.x - segment.v1.x)));
    }
    private generateRandomNumber(numberMax: number): number {
        return (Math.floor(Math.random() * numberMax) + 1);
    }
}
