import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';


@Component({
  selector: 'app-race-track',
  templateUrl: './race-track.component.html',
  styleUrls: ['./race-track.component.css']
})


export class RaceTrackComponent implements OnInit {

  private _id: string;
  public name: string;
  public description: string;
  public lapNumber: number;
  public type: RaceType;
  public ratings: number[] = [];
  public timesPlayed = 0;
  public times: TrackTime[] = [];

  get id(): string { return this._id; }

  public display = new THREE.Object3D();

  //Tableau de Vecteurs vide

  constructor() { }

  ngOnInit() {
  }
}

export class TrackTime {
  constructor(
      public time: number,
      public name: string,
  ) { }
}

export enum RaceType {
  Amateur,
  Professional
}
