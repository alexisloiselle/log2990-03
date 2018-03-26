import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomepageComponent } from "./homepage/homepage.component";
import { GameComponent } from "./race/game-component/game.component";
import { TrackEditorComponent } from "./race/track-editor/track-editor.component";
import { TrackListComponent } from "./race/track-list/track-list.component";
import { RaceMainComponent } from "./race/race-main/race-main.component";
import { CrosswordMainComponent } from "./crossword/crossword-main/crossword-main.component";
import { SinglePlayerMenuComponent } from "./crossword/single-player-menu/single-player-menu.component";
import { MultiplayerMenuComponent } from "./crossword/multiplayer-menu/multiplayer-menu.component";
import { SinglePlayerGameComponent } from "./crossword/single-player-game/single-player-game.component";
import { ChangePasswordComponent } from "./admin/change-password/change-password.component";
import { PasswordFormComponent } from "./admin/auth/password-form/password-form.component";
import { JoinGameComponent } from "./crossword/multiplayer/join-game/join-game.component";
import { CreateGameComponent } from "./crossword/multiplayer/create-game/create-game.component";
import { MultiplayerGameComponent } from "./crossword/multiplayer/multiplayer-game/multiplayer-game.component";
import {TrackListGameComponent} from "./race/game-component/track-list-game/track-list-game.component";

const routes: Routes = [
    { path: "", redirectTo: "/homepage", pathMatch: "full" },
    { path : "passwordChange", component: ChangePasswordComponent},
    { path: "admin", redirectTo: "./admin/admin/admin.component.html"},
    { path: "passwordForm", component: PasswordFormComponent},
    { path: "homepage", component: HomepageComponent },
    { path: "car-game", component: GameComponent },
    { path: "track-editor", component: TrackEditorComponent },
    { path: "track-list", component: TrackListComponent },
    { path: "race", component: RaceMainComponent },
    { path: "crossword", component: CrosswordMainComponent },
    { path: "single-player", component: SinglePlayerMenuComponent },
    { path: "single-player-game/:difficulty", component: SinglePlayerGameComponent },
    { path: "multiplayer", component: MultiplayerMenuComponent },
    { path: "join-game", component: JoinGameComponent },
    { path: "create-game", component: CreateGameComponent},
    { path: "multiplayer-game/:gamename/:isjoingame", component: MultiplayerGameComponent},
    { path: "track-list-game", component: TrackListGameComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
