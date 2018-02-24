import {PointCoordinates} from "./track-editor/point-coordinates";
import {RaceTrackInterface} from "./raceTrack-Interface";


export class RaceTrack{

    private id: string;
    public name: string;
    public description: string;
    public lapNumber: number;
    public type: RaceType;
    public ratings: number[] = [];
    public timesPlayed: number = 0;
    public times: TrackTime[] = [];
    public bestTime: TrackTime;
    public points: PointCoordinates[] = []; 
    public interface: RaceTrackInterface;

    public constructor(theInterface: RaceTrackInterface) {
        this.name = theInterface.name;
        this.description = theInterface.description;
        this.type = theInterface.type;
        this.points = theInterface.points;
    }

    public get Id(): string {
        return this.id;
    }

    public set Id(id: string) {
        this.id = id;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(name: string) {
        this.name = name;
    }

    public get Desciption(): string {
        return this.description;
    }

    public set Desciption(description: string) {
        this.description = description;
    }

    public get Type(): RaceType {
        return this.type;
    }

    public set Type(type: RaceType) {
        this.type = type;
    }

    public get Interface() {
        return this.interface;
    }

    public setBestTime(trackTime: TrackTime): void {
        this.bestTime.Name = trackTime.Name;
        this.bestTime.Time = trackTime.Time;
    }    
    public ngOnInit(): void {
    }
}

export class TrackTime {
    public constructor(
        public time: number,
        public name: string,
    ) {}

    public get Name(): string {
        return this.name;
    }

    public set Name(name: string) {
        this.name = name;
    }

    public get Time(): number {
        return this.time;
    }

    public set Time(time: number) {
        this.time = time;
    }
}

export enum RaceType {
    Amateur,
    Professional
}

