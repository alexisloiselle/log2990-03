import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { GameComponent } from "./race/game-component/game.component";

import { RenderService } from "./render-service/render.service";
import { BasicService } from "./basic.service";
import { CrosswordService } from "./crossword/services/crossword/crossword.service";
import { InputService } from "./crossword/services/crossword/inputService";
import { DefinitionService } from "./crossword/services/crossword/definitionService";
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
import { DefinitionsComponent } from './crossword/definitions/definitions.component';
import { GridComponent } from './crossword/grid/grid.component';

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
        DefinitionsComponent,
        GridComponent
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
        CrosswordService,
        InputService,
        DefinitionService,
        CarEventHandlerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
