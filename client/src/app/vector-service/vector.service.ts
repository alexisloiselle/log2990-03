import { Injectable } from "@angular/core";
import * as THREE from "three";
import { PointCoordinates } from "../race/track-editor/canvas/point-coordinates";

@Injectable()
export class VectorService {

  public constructor() { }

  public createVectors(points: PointCoordinates[]): THREE.Vector2[] {
    const vectorPoints: THREE.Vector2 [] = [];
    for ( const i of points) {
      const vector: THREE.Vector2 = new THREE.Vector2(i.x, i.y);
      vectorPoints.push(vector);
    }

    return vectorPoints;
    }
}
