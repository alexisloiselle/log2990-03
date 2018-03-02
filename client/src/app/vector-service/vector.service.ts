import { Injectable } from "@angular/core";
import * as THREE from "three";
import {RaceTrack} from "../race/raceTrack";

@Injectable()
export class VectorService {

  public constructor() { }

  public creatVectors(race: RaceTrack): THREE.Vector3[] {
    const vectorPoints: THREE.Vector3 [] = [];
    for ( const i of race.points) {
      const vector: THREE.Vector3 = new THREE.Vector3(i.X, i.Y, 0);
      vectorPoints.push(vector);
    }

    return vectorPoints;
    }
}
