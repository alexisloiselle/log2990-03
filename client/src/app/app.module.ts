import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { GameComponent } from "./race/game-component/game.component";

import { RenderService } from "./render-service/render.service";
import { BasicService } from "./basic.service";
import { TrackEditorComponent } from "./race/track-editor/track-editor.component";

import { GameService} from "./game.service";
import { TrackListComponent } from "./race/track-list/track-list.component";
import { RaceTrackComponent } from "./race/race-track/race-track.component";
import { AppRoutingModule } from "./app-routing.module";
import { CrosswordMainComponent } from "./crossword/crossword-main/crossword-main.component";
import { RaceMainComponent } from "./race/race-main/race-main.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { SinglePlayerMenuComponent } from "./crossword/single-player-menu/single-player-menu.component";
import { MultiplayerMenuComponent } from "./crossword/multiplayer-menu/multiplayer-menu.component";
import { SinglePlayerGameComponent } from "./crossword/single-player-game/single-player-game.component";
import {CarEventHandlerService} from "./render-service/car-event-handler.service";
import { AdminComponent } from './admin/admin/admin.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { PasswordFormComponent } from './admin/auth/password-form/password-form.component';
import {AuthService} from "./admin/auth/auth.service";

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        TrackEditorComponent,
        TrackListComponent,
        RaceTrackComponent,
        CrosswordMainComponent,
        RaceMainComponent,
        HomepageComponent,
        SinglePlayerMenuComponent,
        MultiplayerMenuComponent,
        SinglePlayerGameComponent,
        AdminComponent,
        ChangePasswordComponent,
        PasswordFormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        RenderService,
        BasicService,
        GameService,
        CarEventHandlerService, 
        AuthService,
        HttpClientModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
