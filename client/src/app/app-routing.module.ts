import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomepageComponent } from "./homepage/homepage.component";
import { GameComponent } from "./race/game-component/game.component";
import { RaceTrackComponent } from "./race/race-track/race-track.component";
import { TrackEditorComponent } from "./race/track-editor/track-editor.component";
import { TrackListComponent } from "./race/track-list/track-list.component";
import { RaceMainComponent} from "./race/race-main/race-main.component";
import { CrosswordMainComponent } from "./crossword/crossword-main/crossword-main.component";

const routes: Routes = [
  { path: "", redirectTo: "/homepage", pathMatch: "full" },
  { path: "homepage", component: HomepageComponent },
  { path: "car-game", component: GameComponent },
  { path: "race-track", component: RaceTrackComponent },
  { path: "track-editor", component: TrackEditorComponent },
  { path: "track-list", component: TrackListComponent },
  { path: "race", component: RaceMainComponent },
  { path: "crossword", component: CrosswordMainComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
