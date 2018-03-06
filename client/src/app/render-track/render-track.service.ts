import { Injectable } from "@angular/core";
import * as THREE from "three";
import {RaceTrack} from "../race/raceTrack";
import {VectorService} from "../vector-service/vector.service";
import { Vector3 } from "three";
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

    public constructor(private vectorService: VectorService) {
        this.segment = [];
    }

    public buildTrack(race: RaceTrack): THREE.Line {
        let geometry = new THREE.PlaneGeometry( 5, 60, 32 );
        let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        let plane = new THREE.Mesh( geometry, material );
        plane.rotation.z = Math.PI / 2;
        plane.rotation.x = Math.PI / 2;



        // this.race = race;
        // this.vectorPoints = this.vectorService.createVectors(this.race);
        let curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 )
        ]);
        let points: THREE.Vector3[] = curve.getPoints( 50 );
        //let geometry = new THREE.BufferGeometry().setFromPoints( points );

        //let material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

        // Create the final object to add to the scene
        //let curveObject = new THREE.Line( geometry, material );
        
        // //let points = this.curve.getPoints(10);
        // // console.log(points);
        // // this.geometry = new THREE.BufferGeometry().setFromPoints(points); 
        // // this.material = new THREE.LineBasicMaterial({ color: 0xFF0000 });
        this.curveObject = new THREE.Line(this.geometry, this.material)

        return (this.curveObject);

    }

    public buildTrack2(race: RaceTrack): THREE.Mesh[] {
        let points: PointCoordinates[] = race.points;
        let plane: THREE.Mesh[] = [];
        this.generateSegments(race.points);

        for(let i = 0; i<this.segment.length; i++) {

            /*Création du segment de longueur adéquate et roation
            pour le mettre parallèle au plan*/
            let geometry = new THREE.PlaneGeometry( 10, this.segment[i].length());
            let material: THREE.MeshBasicMaterial;
            if(i == 0)
                material = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
            else if(i == 1)
                material = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
            else if(i == 2)
                material = new THREE.MeshBasicMaterial( {color: 0x0000ff, side: THREE.DoubleSide} );
            else 
                material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

            plane.push(new THREE.Mesh( geometry, material ));
            plane[plane.length - 1].rotation.z = -this.segment[i].angle;
            plane[plane.length - 1].rotation.x = Math.PI / 2;
            
            /*----------------------------------------------------*/ 

            /*Par la suite, on ajuste la position!!!!!!!!!!!!*/
            //plane.position.x = i.firstPoint.X;
            //plane.position.y = i.firstPoint.Y;
            
            plane[plane.length - 1].position.x =  (this.segment[i].firstPoint.Y + this.segment[i].lastPoint.Y)/2;;
            plane[plane.length - 1].position.z = (this.segment[i].firstPoint.X +this.segment[i].lastPoint.X)/2;
            

            //plane[plane.length - 1].rotation.y = Math.PI/2;
            //console.log(this.segment[i].firstPoint);
            console.log(plane[plane.length - 1].position);
            //console.log(this.segment[i].lastPoint);
        }
        //console.log(plane);

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