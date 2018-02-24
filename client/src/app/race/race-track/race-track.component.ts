import { Component, OnInit } from "@angular/core";
import {PointCoordinates} from "../track-editor/point-coordinates";

@Component({
    selector: "app-race-track",
    templateUrl: "./race-track.component.html",
    styleUrls: ["./race-track.component.css"]
})

export class RaceTrackComponent implements OnInit {

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

    public constructor(name: string, description: string, raceType: RaceType, points: PointCoordinates[]) {
        this.name = name;
        this.description = description;
        this.type = raceType;
        this.points = points;
        Object.assign(this);
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
