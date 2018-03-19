import { Injectable } from "@angular/core";
import * as THREE from "three";
import {RaceTrack} from "../race/raceTrack";
import {VectorService} from "../vector-service/vector.service";
//import { Vector3 } from "three";
import { PointCoordinates } from "../race/track-editor/canvas/point-coordinates";
import { Car } from "../race/car/car";

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
        this.generateSegments(race.points);

        for(let i = 0; i<this.segment.length; i++) {

            /*Création du segment de longueur adéquate et rotation
            pour le mettre parallèle au plan*/
            let geometry = new THREE.PlaneGeometry( 10, this.segment[i].length());
            let material: THREE.MeshBasicMaterial;
            
            /*On colore en rouge la première tronçon, en vert le deuxième
            et en rouge le troisième juste pour s'orienter.
            Tous les autres tronçons sont en jaune.*/ 
            if(i == 0)
                material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
            else if(i == 1)
                material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
            else if(i == 2)
                material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
            else 
                material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );

            plane.push(new THREE.Mesh( geometry, material ));
            plane[plane.length - 1].rotation.z = -this.segment[i].angle;
            plane[plane.length - 1].rotation.x = Math.PI / 2;
            
            plane[plane.length - 1].position.x =  (this.segment[i].firstPoint.Y + this.segment[i].lastPoint.Y)/2;;
            plane[plane.length - 1].position.z = (this.segment[i].firstPoint.X +this.segment[i].lastPoint.X)/2;
            

            console.log(plane[plane.length - 1].position);
        }

        return plane;
    }

    public generateSegments(pointArray: PointCoordinates[]): void {
        for(let i = 0; i < pointArray.length - 1; i++) {
            const firstPoint : PointCoordinates = new PointCoordinates(0, 0);
            firstPoint.X =  (pointArray[i].X - pointArray[0].X) * CONVERTING_FACTOR;
            firstPoint.Y =  (pointArray[i].Y - pointArray[0].Y) * CONVERTING_FACTOR;

            const lastPoint : PointCoordinates = new PointCoordinates(0, 0);
            lastPoint.X =  (pointArray[i+1].X - pointArray[0].X) * CONVERTING_FACTOR;
            lastPoint.Y =  (pointArray[i+1].Y - pointArray[0].Y) * CONVERTING_FACTOR;

            this.segment.push(new Segment(firstPoint, lastPoint));
        }
    }

    public orienterCar(_car: Car): void {
        _car.rotation.y = this.segment[0].angle - Math.PI/2;
    }

    public genererSurfaceHorsPiste(): THREE.Mesh {
        let HPSurface: THREE.Mesh;
        let geometry = new THREE.PlaneGeometry( 800 , 800);
        let material: THREE.MeshBasicMaterial;

        material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );

        HPSurface = new THREE.Mesh( geometry, material);

        HPSurface.position.y = -0.001;

        HPSurface.rotation.z = Math.PI / 2;
        HPSurface.rotation.x = Math.PI / 2;

        HPSurface.position.x = 0;
        HPSurface.position.z = 0;

        return HPSurface;
        
    }

    public genererCircle(): THREE.Mesh[] {
        let circle: THREE.Mesh[] = [];

        for(let i = 0; i< this.segment.length; i++) {
            let geometry = new THREE.CircleGeometry( 5, 100 );
            let material: THREE.MeshBasicMaterial;
            material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
            

            circle.push(new THREE.Mesh( geometry, material));
            circle[i].rotation.z = Math.PI / 2;
            circle[i].rotation.x = Math.PI / 2;
            circle[i].position.z = this.segment[i].firstPoint.X;
            circle[i].position.x = this.segment[i].firstPoint.Y;

        }

        return circle;
    }
}

export class Segment {
    public firstPoint : PointCoordinates;
    public lastPoint : PointCoordinates;
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