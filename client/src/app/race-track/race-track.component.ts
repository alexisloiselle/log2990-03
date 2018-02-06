import { Component, OnInit } from "@angular/core";

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

    public constructor() {
    }

    public getId(): string {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getDesciption(): string {
        return this.description;
    }

    public getRaceType(): RaceType {
        return this.type;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDesciption(description: string): void {
        this.description = description;
    }
    public setType(raceType: RaceType): void {
        this.type = raceType;
    }
    public setBestTime(trackTime: TrackTime): void {
        this.bestTime.setName(trackTime.getName());
        this.bestTime.setTime(trackTime.getTime());
    }
    public addTrack(trackName: string, trackDescription: string, trackType: RaceType): void {
        this.setName(trackName);
        this.setDesciption(trackDescription);
        this.setType(trackType);
    }

    public ngOnInit(): void {
    }
}

export class TrackTime {
    public constructor(
        public time: number,
        public name: string,
    ) { }
    public setName(name: string): void {
        this.name = name;
    }
    public setTime(time: number): void {
        this.time = time;
    }
    public getTime(): number {
        return this.time;
    }
    public getName(): string {
        return this.name;
    }
}

export enum RaceType {
    Amateur,
    Professional
}
