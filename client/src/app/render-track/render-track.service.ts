import { Injectable } from "@angular/core";
import * as THREE from "THREE";
import {RaceTrack} from "../race/raceTrack";
import {VectorService} from "../vector-service/vector.service";

@Injectable()
export class RenderTrackService {
    public race: RaceTrack;
    public cuvre: THREE.CatmullRomCurve3;
    public vectorService: VectorService;
    public vectorPoints: THREE.Vector3[] = [];
    public geometry: THREE.BufferGeometry;
    public material: THREE.LineBasicMaterial;
    public curveObject: THREE.Line;

    public constructor() {
    }

    public buildTrack(race: RaceTrack): THREE.Line {
        this.race = race;
        this.vectorPoints = this.vectorService.creatVectors(this.race);
        this.geometry = new THREE.BufferGeometry().setFromPoints( this.vectorPoints);
        this.material = new THREE.LineBasicMaterial({ color: 0xFF0000 });

        return (this.curveObject = new THREE.Line(this.geometry, this.material));

    }
}
