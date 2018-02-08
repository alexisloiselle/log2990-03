import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomepageComponent } from "./homepage/homepage.component";
import { GameComponent } from "./game-component/game.component";
import { RaceTrackComponent } from "./race-track/race-track.component";
import { TrackEditorComponent } from "./track-editor/track-editor.component";
import { TrackListComponent } from "./track-list/track-list.component";
import { CarRaceComponent} from "./car-race/car-race.component";
import { CrosswordComponent } from "./crossword/crossword.component";

const routes: Routes = [
  { path: "", redirectTo: "/homepage", pathMatch: "full" },
  { path: "homepage", component: HomepageComponent },
  { path: "car-game", component: GameComponent },
  { path: "race-track", component: RaceTrackComponent },
  { path: "track-editor", component: TrackEditorComponent },
  { path: "track-list", component: TrackListComponent },
  { path: "car-race", component: CarRaceComponent },
  { path: "crossword", component: CrosswordComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
