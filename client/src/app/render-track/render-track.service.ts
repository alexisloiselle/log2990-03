import { Injectable } from "@angular/core";
import * as THREE from "three";
import { RaceTrack } from "../race/raceTrack";
import { PointCoordinates } from "../race/track-editor/canvas/point-coordinates";

const CONVERTING_FACTOR: number = 1;

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
        let plane: THREE.Mesh[] = [];
        this.generateSegments(race.trackShape.getPoints());

        for (let i: number = 0; i < this.segment.length; i++) {

            /*Création du segment de longueur adéquate et rotation
            pour le mettre parallèle au plan*/
            const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(10, this.segment[i].length());
            let material: THREE.MeshBasicMaterial;

            /*On colore en rouge la première tronçon, en vert le deuxième
            et en rouge le troisième juste pour s'orienter.
            Tous les autres tronçons sont en jaune.*/
            if (i === 0) {
                material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
            } else if (i === 1) {
                material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
            } else if (i === 2) {
                material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
            } else {
                material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
            }

            plane.push(new THREE.Mesh(geometry, material));
            plane[plane.length - 1].rotation.z = -this.segment[i].angle;
            plane[plane.length - 1].rotation.x = Math.PI / 2;

            plane[plane.length - 1].position.x = (this.segment[i].firstPoint.y + this.segment[i].lastPoint.y) / 2;
            plane[plane.length - 1].position.z = (this.segment[i].firstPoint.x + this.segment[i].lastPoint.x) / 2;
        }

        return plane;
    }

    public generateSegments(pointArray: THREE.Vector2[]): void {
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
        const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(800, 800);
        let material: THREE.MeshBasicMaterial;

        material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });

        hPSurface = new THREE.Mesh(geometry, material);

        hPSurface.position.y = -0.001;

        hPSurface.rotation.z = Math.PI / 2;
        hPSurface.rotation.x = Math.PI / 2;

        hPSurface.position.x = 0;
        hPSurface.position.z = 0;

        return hPSurface;

    }

    public genererCircle(): THREE.Mesh[] {
        const circle: THREE.Mesh[] = [];

        for (let i: number = 0; i < this.segment.length; i++) {
            const geometry: THREE.CircleGeometry = new THREE.CircleGeometry(5, 100);
            let material: THREE.MeshBasicMaterial;
            material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });

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
