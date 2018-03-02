import { Injectable } from "@angular/core";
import * as THREE from "THREE";
import {RaceTrack} from "../race/raceTrack";
import {VectorService} from "../vector-service/vector.service";

@Injectable()
export class RenderTrackService {
    public race: RaceTrack;
    public curve: THREE.CatmullRomCurve3;
    public vectorPoints: THREE.Vector3[] = [];
    public geometry: THREE.BufferGeometry;
    public material: THREE.LineBasicMaterial;
    public curveObject: THREE.Line;

    public constructor(private vectorService: VectorService) {
    }

    public buildTrack(race: RaceTrack): THREE.Line {
        this.race = race;
        this.vectorPoints = this.vectorService.createVectors(this.race);
        this.curve = new THREE.CatmullRomCurve3(this.vectorPoints);
        let points = this.curve.getPoints(50);
        this.geometry = new THREE.BufferGeometry().setFromPoints(points);
        this.material = new THREE.LineBasicMaterial({ color: 0xFF0000 });

        return (this.curveObject = new THREE.Line(this.geometry, this.material));

    }
}
