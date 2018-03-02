import { Injectable } from "@angular/core";
import * as THREE from "three";

const THIRD: number = 3;
const SECOND: number = 2;
const TEN: number = 10;

enum Colors {
    Puddle = 0x0000FF,
    Puthole = 0x000000,
    Boost = 0x99FF99,
}

enum PuddleDim {
    RadiusTop = 5,
    RadiusBottom = 5,
    Heigth = 10,
}

enum PutholeDim {
    RadiusTop = 5,
    RadiusBottom = 5,
    Heigth = 10,
}

@Injectable()
export class ObstaclesService {
    private readonly MAX_OBJECTS: number = 15;
    private readonly SPACED_POINTS_NUMBER: number = 80;
    private readonly BOOST_DIMENSIONS: number= 10;

    private trackPoints: Array<THREE.Vector3>  = new Array<THREE.Vector3>();
    public puddles: THREE.Object3D = new THREE.Object3D();
    public putholes: THREE.Object3D = new THREE.Object3D();
    public boosts: THREE.Object3D = new THREE.Object3D();
    public randomPuddlesPositions: Array<THREE.Vector3> = new Array<THREE.Vector3>();
    public randomPutholesPositions: Array<THREE.Vector3> = new Array<THREE.Vector3>();
    public randomBoostsPositions: Array<THREE.Vector3> = new Array<THREE.Vector3>();
    public isValidated: Boolean = false;
    public puddlesNumber: number = 0;
    public putholesNumber: number = 0;
    public boostsNumber: number = 0;
    public randomPositionsCreated: boolean = false;
    public needsNewPoints: boolean = false;
    public isEditing: boolean = false;

    public constructor() {
        this.boosts.name = "boosts";
        this.puddles.name = "puddles";
        this.putholes.name = "putholes";
    }

    public get puddlesPos(): Array<THREE.Vector3> {

        return this.randomPuddlesPositions;
    }

    public get putholesPos(): Array<THREE.Vector3> {
        return this.randomPutholesPositions;
    }

    public get boostsPos(): Array<THREE.Vector3> {
        return this.randomBoostsPositions;
    }

    private generateMoreTrackPoints(): Array<THREE.Vector3> {
        const closedSpline: THREE.CatmullRomCurve3 = new THREE.CatmullRomCurve3(this.trackPoints);
        // tslint:disable-next-line:no-any
        (closedSpline as any).closed = true;

        return closedSpline.getSpacedPoints(this.SPACED_POINTS_NUMBER);
    }
    private isSameTrackPoints(trackPoints: Array<THREE.Vector3>): boolean {
        let isSame: boolean = true;
        if (trackPoints.length !== this.trackPoints.length) {
            isSame = false;
        } else {
            for (let i: number = 0; i < trackPoints.length; i++) {
                if (!this.trackPoints[i].equals(trackPoints[i])) {
                    isSame = false;
                    break;
                }
            }
        }

        return isSame;
    }

    public generateRandomPositions(trackPoints: Array<THREE.Vector3>): void {
        let remainingPoints: Array<THREE.Vector3> = new Array<THREE.Vector3>();
        if (!this.isSameTrackPoints(trackPoints)) {
            this.trackPoints = trackPoints;
            this.randomPositionsCreated = false;
        }
        if (this.trackPoints.length > 0) {
            if (!this.randomPositionsCreated || this.needsNewPoints) {
                const allPoints: Array<THREE.Vector3> = this.generateMoreTrackPoints();
                remainingPoints = this.boostsPositions(allPoints);
                remainingPoints = this.obstaclesPositions(remainingPoints, this.randomPuddlesPositions);
                remainingPoints = this.obstaclesPositions(remainingPoints, this.randomPutholesPositions);
                this.moveToNewPositions(this.puddles, this.randomPuddlesPositions, this.puddlesNumber);
                this.moveToNewPositions(this.putholes, this.randomPutholesPositions, this.putholesNumber);
                this.moveToNewPositions(this.boosts, this.randomBoostsPositions, this.boostsNumber);
                this.randomPositionsCreated = true;
                this.needsNewPoints = false;
            }
        }
    }

    private obstaclesPositions(points: Array<THREE.Vector3>
        ,                      randomPositions: Array<THREE.Vector3>): Array<THREE.Vector3> {
        randomPositions.splice(0, randomPositions.length);
        let remainingPoints: Array<THREE.Vector3> = new Array<THREE.Vector3>();
        while (randomPositions.length < this.MAX_OBJECTS / THIRD) {
            const randomPoint: number = Math.floor(Math.random() * points.length);
            randomPositions.push(points[randomPoint]);
            points.splice(randomPoint, 1);
        }
        remainingPoints = points;

        return remainingPoints;
    }

    private pointsBetweenTrackPoints(): Array<number> {
        const distances: Array<number> = new Array<number>();
        let distanceSum: number = 0;
        let distance: number;
        for (let i: number = 0; i < this.trackPoints.length; i++) {
            if (i < this.trackPoints.length - 1) {
                distance = this.trackPoints[i].distanceTo(this.trackPoints[i + 1]);
                distanceSum += distance;
                distances.push(this.trackPoints[i].distanceTo(this.trackPoints[i + 1]));
            } else {
                distance = this.trackPoints[i].distanceTo(this.trackPoints[0]);
                distanceSum += distance;
                distances.push(this.trackPoints[i].distanceTo(this.trackPoints[0]));
            }
        }
        const pointsPerSegment: Array<number> = new Array<number>();
        distances.forEach((dist) => {
            const pointPerSegment: number = Math.ceil((dist / distanceSum)
            * this.SPACED_POINTS_NUMBER);
            pointsPerSegment.push(pointPerSegment);
        });

        return pointsPerSegment;
    }

    private boostsPositions(points: Array<THREE.Vector3>): Array<THREE.Vector3> {
        this.randomBoostsPositions.splice(0, this.randomBoostsPositions.length);
        const possibleBoostsPoints: Array<THREE.Vector3> = new Array<THREE.Vector3>();
        const pointsBetweenTrackPoints: number[] = this.pointsBetweenTrackPoints();
        let pointsIndexOffset: number = 0;
        for (let i: number = 0; i < this.trackPoints.length; i++) {
            for (let j: number = 0; j < Math.floor(pointsBetweenTrackPoints[i] / SECOND) - 1; j++) {
                possibleBoostsPoints.push(points[j + pointsIndexOffset]);
            }
            pointsIndexOffset += pointsBetweenTrackPoints[i];
        }
        let remainingPoints: Array<THREE.Vector3> = new Array<THREE.Vector3>();
        while (this.randomBoostsPositions.length < this.MAX_OBJECTS / THIRD) {
            const randomPoint: number = Math.floor(Math.random() * possibleBoostsPoints.length);
            this.randomBoostsPositions.push(possibleBoostsPoints[randomPoint]);
            possibleBoostsPoints.splice(randomPoint, 1);
        }
        for (const i of this.randomBoostsPositions) {
            for (let j: number = 0; j < points.length; j++) {
                if (i.equals(points[j])) {
                    points.splice(j, 1);
                }
            }
        }
        remainingPoints = points;

        return remainingPoints;
    }

    public createObstaclesAndBoosts(): void {
        if (this.isValidated || this.isEditing) {
            if (this.puddlesNumber > 0) {
                this.createObstacle(this.puddles, this.randomPuddlesPositions, this.puddlesNumber);
            }
            if (this.putholesNumber > 0) {
                this.createObstacle(this.putholes, this.randomPutholesPositions, this.putholesNumber);
            }
            if (this.boostsNumber > 0) {
                this.createObstacle(this.boosts, this.randomBoostsPositions, this.boostsNumber);
            }
        }
    }

    public addObstaclesToScene(display: THREE.Object3D): void {
        display.add(this.puddles);
        display.add(this.putholes);
        display.add(this.boosts);
    }

    private moveToNewPositions(obstacleType: THREE.Object3D,
                               obstacleRandomPositions: Array<THREE.Vector3>,
                               obstacleNumber: number): void {
        if (obstacleNumber > 0) {
            for (let i: number = 0; i < obstacleType.children.length; i++) {
                obstacleType.children[i].position.copy(obstacleRandomPositions[i]);
                if (obstacleType.name === "boosts") {
                    obstacleType.children[i].position.y += TEN;
                }
            }
        }
    }

    public updateAllObstacles(): void {
        if (this.isValidated || this.isEditing ) {
            this.updateObstacles(this.puddles, this.randomPuddlesPositions, this.puddlesNumber);
            this.updateObstacles(this.putholes, this.randomPutholesPositions, this.putholesNumber);
            this.updateObstacles(this.boosts, this.randomBoostsPositions, this.boostsNumber);
        }
    }

    private updateObstacles(obstacles: THREE.Object3D,
                            obstacleRandomPositions: Array<THREE.Vector3>,
                            newObstacleNumber: number): void {
        if (newObstacleNumber < obstacles.children.length) {
            const obstaclesToRemove: number = obstacles.children.length - newObstacleNumber;
            for (let i: number = 0; i < obstaclesToRemove; i++) {
                obstacles.children.pop();
            }
        } else if (newObstacleNumber >= obstacles.children.length) {
            this.createObstacle(obstacles, obstacleRandomPositions, newObstacleNumber);
        }
    }

    private createObstacle(obstacles: THREE.Object3D,
                           obstacleRandomPositions: Array<THREE.Vector3>,
                           obstacleNumber: number): void {
        obstacles.children.length = 0;
        for (let i: number = 0; i < obstacleNumber; i++) {
            let obstacle: THREE.Mesh;
            if (obstacles.name === "puddles") {
                obstacle = this.puddleMesh();
            } else if (obstacles.name === "putholes") {
                obstacle = this.putholeMesh();
            } else if (obstacles.name === "boosts") {
                obstacle = this.bootsMesh();
            }
            obstacle.position.copy(obstacleRandomPositions[i]);
            obstacles.add(obstacle);
        }
    }

    private puddleMesh(): THREE.Mesh {
        const puddleGeo: THREE.CylinderGeometry =
        new THREE.CylinderGeometry(PuddleDim.RadiusTop, PuddleDim.RadiusBottom, PuddleDim.Heigth);
        const puddleMat: THREE.MeshBasicMaterial =
        new THREE.MeshBasicMaterial({ color: Colors.Puddle });

        return new THREE.Mesh(puddleGeo, puddleMat);
    }

    private putholeMesh(): THREE.Mesh {
        const putholeGeo: THREE.CylinderGeometry =
        new THREE.CylinderGeometry(PutholeDim.RadiusTop, PutholeDim.RadiusBottom, PutholeDim.Heigth);
        const putholeMat: THREE.MeshBasicMaterial =
        new THREE.MeshBasicMaterial({ color: Colors.Puthole });

        return new THREE.Mesh(putholeGeo, putholeMat);
    }

    private bootsMesh(): THREE.Mesh {
        const boostGeo: THREE.BoxGeometry =
        new THREE.BoxGeometry(this.BOOST_DIMENSIONS, this.BOOST_DIMENSIONS, this.BOOST_DIMENSIONS);
        const boostMat: THREE.MeshBasicMaterial =
        new THREE.MeshBasicMaterial({ color: Colors.Boost });

        return (new THREE.Mesh(boostGeo, boostMat));
    }

    public clear(): void {
        this.randomPuddlesPositions.length = 0;
        this.randomPutholesPositions.length = 0;
        this.randomBoostsPositions.length = 0;
        this.puddles.children.length = 0;
        this.putholes.children.length = 0;
        this.boosts.children.length = 0;
        this.putholesNumber = 0;
        this.puddlesNumber = 0;
        this.boostsNumber = 0;
    }
}
