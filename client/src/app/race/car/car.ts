import { Vector3, Vector2, Matrix4, Object3D, Euler, Quaternion, LineCurve, PerspectiveCamera, Box3 } from "three";
import { Engine } from "./engine";
import { MS_TO_SECONDS, GRAVITY, PI_OVER_2, RAD_TO_DEG } from "../constants";
import { Wheel } from "./wheel";
import { CarGPS } from "./car-gps";

export const DEFAULT_WHEELBASE: number = 2.78;
export const DEFAULT_MASS: number = 1515;
export const DEFAULT_DRAG_COEFFICIENT: number = 0.35;

const MAXIMUM_STEERING_ANGLE: number = 0.25;
const INITIAL_MODEL_ROTATION: Euler = new Euler(0, PI_OVER_2, 0);
const INITIAL_WEIGHT_DISTRIBUTION: number = 0.5;
const MINIMUM_SPEED: number = 0.05;
const NUMBER_REAR_WHEELS: number = 2;
const NUMBER_WHEELS: number = 4;

export class Car extends Object3D {
    public isAcceleratorPressed: boolean;

    private readonly engine: Engine;
    private readonly _mass: number;
    private readonly rearWheel: Wheel;
    private readonly wheelbase: number;
    private readonly dragCoefficient: number;
    // private readonly boundingBox: Box3;

    private _speed: Vector3;
    private isBraking: boolean;
    private _mesh: Object3D;
    private steeringWheelDirection: number;
    private weightRear: number;
    public carGPS: CarGPS;

    public get mass(): number {
        return this._mass;
    }

    public get mesh(): Object3D {
        return this._mesh;
    }

    public get speed(): Vector3 {
        return this._speed.clone();
    }

    public set speed(v: Vector3) {
        this._speed = v;
    }

    public get currentGear(): number {
        return this.engine.currentGear;
    }

    public get rpm(): number {
        return this.engine.rpm;
    }

    public get angle(): number {
        return this._mesh.rotation.y * RAD_TO_DEG;
    }

    public get direction(): Vector3 {
        const rotationMatrix: Matrix4 = new Matrix4();
        const carDirection: Vector3 = new Vector3(0, 0, -1);

        rotationMatrix.extractRotation(this._mesh.matrix);
        carDirection.applyMatrix4(rotationMatrix);

        return carDirection;
    }

    public get Position(): Vector3 {
        return this._mesh.position.clone();
    }

    public get BoundingBox(): Box3 {
        // Bounding box follows
        // this.boundingBox.setFromObject(this);

        return new Box3().setFromObject(this);
    }

    public attachCamera(camera: PerspectiveCamera): void {
        this._mesh.add(camera);
    }

    public removeCamera(camera: PerspectiveCamera): void {
        this._mesh.remove(camera);
    }

    public constructor(
        engine: Engine = new Engine(),
        rearWheel: Wheel = new Wheel(),
        wheelbase: number = DEFAULT_WHEELBASE,
        mass: number = DEFAULT_MASS,
        dragCoefficient: number = DEFAULT_DRAG_COEFFICIENT) {
        super();

        if (wheelbase <= 0) {
            console.error("Wheelbase should be greater than 0.");
            wheelbase = DEFAULT_WHEELBASE;
        }

        if (mass <= 0) {
            console.error("Mass should be greater than 0.");
            mass = DEFAULT_MASS;
        }

        if (dragCoefficient <= 0) {
            console.error("Drag coefficient should be greater than 0.");
            dragCoefficient = DEFAULT_DRAG_COEFFICIENT;
        }

        this.engine = engine;
        this.rearWheel = rearWheel;
        this.wheelbase = wheelbase;
        this._mass = mass;
        this.dragCoefficient = dragCoefficient;
        // this.boundingBox = new Box3().setFromObject(this);

        this.isBraking = false;
        this.steeringWheelDirection = 0;
        this.weightRear = INITIAL_WEIGHT_DISTRIBUTION;
        this._speed = new Vector3(0, 0, 0);
    }

    public initializeGPS(trackSegments: Array<LineCurve>, trackWidth: number): void {
        this.carGPS = new CarGPS(trackSegments, trackWidth);
    }

    public init(object: Object3D): void {
        this._mesh = object;
        this.mesh.setRotationFromEuler(INITIAL_MODEL_ROTATION);
        this.add(this._mesh);
    }

    public steerLeft(): void {
        this.steeringWheelDirection = MAXIMUM_STEERING_ANGLE;
    }

    public steerRight(): void {
        this.steeringWheelDirection = -MAXIMUM_STEERING_ANGLE;
    }

    public releaseSteering(): void {
        this.steeringWheelDirection = 0;
    }

    public releaseBrakes(): void {
        this.isBraking = false;
    }

    public brake(): void {
        this.isBraking = true;
    }

    public update(deltaTime: number): void {
        deltaTime = deltaTime / MS_TO_SECONDS;

        // Move to car coordinates
        const rotationMatrix: Matrix4 = new Matrix4();
        rotationMatrix.extractRotation(this._mesh.matrix);
        const rotationQuaternion: Quaternion = new Quaternion();
        rotationQuaternion.setFromRotationMatrix(rotationMatrix);
        this._speed.applyMatrix4(rotationMatrix);

        // Physics calculations
        this.physicsUpdate(deltaTime);

        // Move back to world coordinates
        this._speed = this.speed.applyQuaternion(rotationQuaternion.inverse());

        // Angular rotation of the car
        const R: number = DEFAULT_WHEELBASE / Math.sin(this.steeringWheelDirection * deltaTime);
        const omega: number = this._speed.length() / R;
        this._mesh.rotateY(omega);
    }

    private physicsUpdate(deltaTime: number): void {
        this.rearWheel.angularVelocity += this.getAngularAcceleration() * deltaTime;
        this.engine.update(this._speed.length(), this.rearWheel.radius);
        this.weightRear = this.getWeightDistribution();
        this._speed.add(this.getDeltaSpeed(deltaTime));
        this._speed.setLength(this._speed.length() <= MINIMUM_SPEED ? 0 : this._speed.length());
        this._mesh.position.add(this.getDeltaPosition(deltaTime));
        this.rearWheel.update(this._speed.length());
    }

    private getWeightDistribution(): number {
        const acceleration: number = this.getAcceleration().length();
        const distribution: number =
            this._mass + (1 / this.wheelbase) * this._mass * acceleration / 2;

        /* tslint:disable-next-line:no-magic-numbers */
        return Math.min(Math.max(0.25, distribution), 0.75);
    }

    private getLongitudinalForce(): Vector3 {
        const resultingForce: Vector3 = new Vector3();

        if (this._speed.length() >= MINIMUM_SPEED) {
            const dragForce: Vector3 = this.getDragForce();
            const rollingResistance: Vector3 = this.getRollingResistance();
            const lateralResistance: Vector3 = this.getLateralResistance();
            resultingForce.add(dragForce).add(rollingResistance).add(lateralResistance);
        }

        if (this.isAcceleratorPressed) {
            const tractionForce: number = this.getTractionForce();
            const accelerationForce: Vector3 = this.direction;
            accelerationForce.multiplyScalar(tractionForce);
            resultingForce.add(accelerationForce);
        } else if (this.isBraking && this.isGoingForward()) {
            const brakeForce: Vector3 = this.getBrakeForce();
            resultingForce.add(brakeForce);
        }

        return resultingForce;
    }

    private getRollingResistance(): Vector3 {
        const tirePressure: number = 1;
        // formula taken from: https://www.engineeringtoolbox.com/rolling-friction-resistance-d_1303.html

        // tslint:disable-next-line:no-magic-numbers
        const rollingCoefficient: number = (1 / tirePressure) * (Math.pow(this.speed.length() * 3.6 / 100, 2) * 0.0095 + 0.01) + 0.005;

        return this.direction.multiplyScalar(rollingCoefficient * this._mass * GRAVITY);
    }

    private getLateralResistance(): Vector3 {
        const lateralCoefficient: number = 0.4;
        const lateralVector: Vector3 = this.direction.cross(this.up);

        return lateralVector.normalize()
            .multiplyScalar(this._speed.dot(lateralVector) * lateralCoefficient * this.mass * GRAVITY);
    }

    public orientCar(segment: THREE.LineCurve): void {
        this.mesh.rotation.y = Math.atan((segment.v2.y - segment.v1.y) / (segment.v2.x - segment.v1.x));
    }

    private getDragForce(): Vector3 {
        const carSurface: number = 3;
        const airDensity: number = 1.2;
        const resistance: Vector3 = this.direction;
        resistance.multiplyScalar(airDensity * carSurface * -this.dragCoefficient * this.speed.length() * this.speed.length());

        return resistance;
    }

    private getTractionForce(): number {
        const force: number = this.getEngineForce();
        const maxForce: number =
            this.rearWheel.frictionCoefficient * this._mass * GRAVITY * this.weightRear * NUMBER_REAR_WHEELS / NUMBER_WHEELS;

        return -Math.min(force, maxForce);
    }

    private getAngularAcceleration(): number {
        return this.getTotalTorque() / (this.rearWheel.inertia * NUMBER_REAR_WHEELS);
    }

    private getBrakeForce(): Vector3 {
        return this.direction.multiplyScalar(this.rearWheel.frictionCoefficient * this._mass * GRAVITY);
    }

    private getBrakeTorque(): number {
        return this.getBrakeForce().length() * this.rearWheel.radius;
    }

    private getTractionTorque(): number {
        return this.getTractionForce() * this.rearWheel.radius;
    }

    private getTotalTorque(): number {
        return this.getTractionTorque() * NUMBER_REAR_WHEELS + this.getBrakeTorque();
    }

    private getEngineForce(): number {
        return this.engine.getDriveTorque() / this.rearWheel.radius;
    }

    private getAcceleration(): Vector3 {
        return this.getLongitudinalForce().divideScalar(this._mass);
    }

    private getDeltaSpeed(deltaTime: number): Vector3 {
        return this.getAcceleration().multiplyScalar(deltaTime);
    }

    private getDeltaPosition(deltaTime: number): Vector3 {
        return this.speed.multiplyScalar(deltaTime);
    }

    private isGoingForward(): boolean {
        // tslint:disable-next-line:no-magic-numbers
        return this.speed.normalize().dot(this.direction) > 0.05;
    }

    /*MOVED IT TO HERE INSTEAD OF IN BOTCARS*/
    public getPosition(): Vector2 {
        return this.carGPS.getPosition(this.mesh);
    }
    public reachedJonction(jonctionPosition: Vector2, trackWidth: number): boolean {
        // Bad smell the function takes too much arguments, find a way to make it take less
        return this.carGPS.reachedJonction(this.mesh);
    }
}
