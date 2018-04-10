import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { GameComponent } from "./race/game-component/game.component";

import { RenderService } from "./render-service/render.service";
import { BasicService } from "./basic.service";
import { CrosswordService } from "./crossword/services/crossword/crossword.service";
import { InputService } from "./crossword/services/crossword/input.service";
import { DefinitionService } from "./crossword/services/crossword/definition.service";
import { SocketService } from "./crossword/services/socket.service";

import { TrackEditorComponent } from "./race/track-editor/track-editor.component";

import { TrackListComponent } from "./race/track-list//track-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { CrosswordMainComponent } from "./crossword/crossword-main/crossword-main.component";
import { RaceMainComponent } from "./race/race-main/race-main.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { SinglePlayerMenuComponent } from "./crossword/single-player-menu/single-player-menu.component";
import { MultiplayerMenuComponent } from "./crossword/multiplayer-menu/multiplayer-menu.component";
import { SinglePlayerGameComponent } from "./crossword/single-player-game/single-player-game.component";
import { CarEventHandlerService } from "./render-service/car-event-handler.service";
import { DefinitionsComponent } from "./crossword/definitions/definitions.component";
import { GridComponent } from "./crossword/grid/grid.component";
import { ChangePasswordComponent } from "./admin/change-password/change-password.component";
import { PasswordFormComponent } from "./admin/auth/password-form/password-form.component";
import { AuthService } from "./admin/auth/auth.service";
import { TrackService } from "./track.service";
import { CameraService } from "./render-service/camera.service";
import { SkyboxService } from "./render-service/skybox.service";
import { CollisionService } from "./race/collisions/collision.service";
import { CanvasComponent } from "./race/track-editor/canvas/canvas.component";
import { JoinGameComponent } from "./crossword/multiplayer/join-game/join-game.component";
import { CreateGameComponent } from "./crossword/multiplayer/create-game/create-game.component";
import { MultiplayerGameComponent } from "./crossword/multiplayer/multiplayer-game/multiplayer-game.component";
import { RenderTrackService } from "./render-track/render-track.service";
import { RaceAdministratorService } from "./race/race-services/race-administrator.service";
import { TrackListGameComponent } from "./race/game-component/track-list-game/track-list-game.component";
import { AdminComponent } from "./admin/admin/admin.component";
import { HudService } from "./render-service/hud.service";
import { BestTimeComponent } from "./race/game-component/best-times-array/best-times-array.component";
import { BestTimeService } from "./race/game-component/best-times-array/best-time.service";

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        TrackEditorComponent,
        TrackListComponent,
        CrosswordMainComponent,
        RaceMainComponent,
        HomepageComponent,
        SinglePlayerMenuComponent,
        MultiplayerMenuComponent,
        SinglePlayerGameComponent,
        DefinitionsComponent,
        GridComponent,
        ChangePasswordComponent,
        PasswordFormComponent,
        CanvasComponent,
        JoinGameComponent,
        CreateGameComponent,
        MultiplayerGameComponent,
        TrackListGameComponent,
        AdminComponent,
        BestTimeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        RenderService,
        BasicService,
        CrosswordService,
        CarEventHandlerService,
        AuthService,
        HttpClientModule,
        DefinitionService,
        InputService,
        TrackService,
        SocketService,
        CameraService,
        SkyboxService,
        CollisionService,
        TrackService,
        RenderTrackService,
        HudService,
        RaceAdministratorService,
        BestTimeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
