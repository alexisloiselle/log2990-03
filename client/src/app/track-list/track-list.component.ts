import { Component, OnInit } from '@angular/core';
import {RaceTrackComponent} from '../race-track/race-track.component';
//import {TrackService} from '../track.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})

export class TrackListComponent implements OnInit {
  public tracks: RaceTrackComponent[];
  //private selectedTrack: RaceTrackComponent;
  //private trackIdValue: string;

  constructor() { }

  ngOnInit() {
    this.reload();
  }
  public reload() {
    
  }

}
