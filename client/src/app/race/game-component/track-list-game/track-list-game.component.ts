import { Component, OnInit} from "@angular/core";
import {RaceTrack} from "../../raceTrack";
import {TrackService} from "../../../track.service";
import {RenderTrackService} from "../../../render-track/render-track.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-track-list-game',
  templateUrl: './track-list-game.component.html',
  styleUrls: ['./track-list-game.component.css']
})

export class TrackListGameComponent implements OnInit {

  public parsedTracks: RaceTrack[];
  private selectedTrack: RaceTrack;

  public constructor(private trackService: TrackService, 
                      private renderTrackService: RenderTrackService, 
                      private router: Router) {
      this.parsedTracks = [];
  }

  public async ngOnInit(): Promise<void> {
      await this.getTracks();
  }

  public set SelectedTrack(track: RaceTrack) {
      this.selectedTrack = track;
  }

  public get SelectedTrack(): RaceTrack {
      return this.selectedTrack;
  }

  public async getTracks(): Promise<void> {
      this.parsedTracks = await this.trackService.getTracks();
  }

  public onSelectTrack(track: RaceTrack): void {
      this.selectedTrack = track;
  }

  public async deleteTrack(track: RaceTrack): Promise<void> {
      await this.trackService.deleteTrack(track.id);
      await this.ngOnInit();
  }
  
  public playTrack(selectedTrack: RaceTrack): void {
      this.renderTrackService.track = selectedTrack;
      console.log("La Track est loader");
      this.router.navigateByUrl("/car-game");
  }
}
