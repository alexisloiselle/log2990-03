import {PointCoordinates} from "./track-editor/point-coordinates";


export class RaceTrack{

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

    public constructor(name: string, description: string, type: RaceType, points: PointCoordinates[] ) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.points = points;
    }

    public ngOnInit(): void {
        this.name = "leNom";
    }
}

export class TrackTime {
    public constructor(
        public time: number,
        public name: string,
    ) {}
}

export enum RaceType {
    Amateur,
    Professional
}

