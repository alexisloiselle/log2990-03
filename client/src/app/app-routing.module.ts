import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { GameComponent } from "./game-component/game.component";
import { RaceTrackComponent } from "./race-track/race-track.component";
import { TrackEditorComponent } from "./track-editor/track-editor.component";
import { TrackListComponent } from "./track-list/track-list.component";
import { CrosswordComponent } from "./crossword/crossword.component";

const routes: Routes = [
  { path: "cargame", component: GameComponent },
  { path: "racetrack", component: RaceTrackComponent},
  { path: "trackeditor", component: TrackEditorComponent},
  { path: "tracklist", component: TrackListComponent},
  { path: "crossword", component: CrosswordComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
