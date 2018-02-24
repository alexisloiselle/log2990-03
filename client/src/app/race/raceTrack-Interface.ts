import {RaceType, TrackTime} from "./raceTrack";
import {PointCoordinates} from "./track-editor/point-coordinates";

export class RaceTrackInterface{
    public id: string;
    public name: string;
    public description: string;
    public lapNumber: number;
    public type: RaceType;
    public ratings: number[] = [];
    public timesPlayed: number = 0;
    public times: TrackTime[] = [];
    public bestTime: TrackTime;
    public points: PointCoordinates[] = []; 
}