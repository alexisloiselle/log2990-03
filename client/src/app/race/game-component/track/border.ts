
import * as THREE from "three";

export class Border {
    public curves: Array<THREE.LineCurve> = Array<THREE.LineCurve>();

    public constructor(trackLines: Array<THREE.LineCurve>, holeLines: Array<THREE.LineCurve>) {
        this.createWallCurves(trackLines, holeLines);
    }

    public createWallCurves(trackLines: Array<THREE.LineCurve>, holeLines: Array<THREE.LineCurve>): void {
        this.curves = this.curves.concat(trackLines);
        this.curves = this.curves.concat(holeLines);
    }
}
