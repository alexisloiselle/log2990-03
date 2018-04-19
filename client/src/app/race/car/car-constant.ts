import { Euler } from "three";
import { PI_OVER_2 } from "../constants";

export const HEADLIGHT_COLOR: number = 0xFFF000;
export const HEADLIGHT_NIGHT_INTENSITY: number = 1.5;
export const HEADLIGHT_DISTANCE: number = 2000;
export const HEADLIGHT_ANGLE: number = 0.5;
export const HEADLIGHT_HEIGHT: number = 0.5;
export const MAXIMUM_STEERING_ANGLE: number = 0.25;
export const INITIAL_MODEL_ROTATION: Euler = new Euler(0, PI_OVER_2, 0);
export const INITIAL_WEIGHT_DISTRIBUTION: number = 0.5;
export const MINIMUM_SPEED: number = 0.05;
export const NUMBER_REAR_WHEELS: number = 2;
export const NUMBER_WHEELS: number = 4;
export const DEFAULT_WHEELBASE: number = 2.78;
export const DEFAULT_MASS: number = 1515;
export const DEFAULT_DRAG_COEFFICIENT: number = 0.35;
