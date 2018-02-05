import { Component, OnInit } from "@angular/core";
import * as THREE from "three";
import { Object3D } from "three";

@Component({
  selector: "app-race-track",
  templateUrl: "./race-track.component.html",
  styleUrls: ["./race-track.component.css"],
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

  public get id(): string { return this._id; }

  public display: Object3D = new THREE.Object3D();

  // Tableau de Vecteurs vide

  public constructor() { }

  public ngOnInit(): void {
   }
}

export class TrackTime {
  public constructor(
      public time: number,
      public name: string,
  ) { }
  public getTime(): number {
    return this.time;
  }
  public getName(): string {
    return this.name;
  }
  public setTime(time: number): void {
    this.time = time;
  }
  public setName(name: string): void {
    this.name = name;
  }
}

export enum RaceType {
  Amateur,
  Professional
}
