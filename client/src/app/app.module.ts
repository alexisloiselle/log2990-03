import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { GameComponent } from "./game-component/game.component";

import { RenderService } from "./render-service/render.service";
import { BasicService } from "./basic.service";
import { TrackEditorComponent } from "./track-editor/track-editor.component";

import { GameService} from "./game.service";
import { TrackListComponent } from "./track-list/track-list.component";
import { RaceTrackComponent } from "./race-track/race-track.component";
import { AppRoutingModule } from "./app-routing.module";
import { CrosswordComponent } from "./crossword/crossword.component";
import { CarRaceComponent } from "./car-race/car-race.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { CarEventHandlerService } from "./render-service/car-event-handler.service";

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        TrackEditorComponent,
        TrackListComponent,
        RaceTrackComponent,
        CrosswordComponent,
        CarRaceComponent,
        HomepageComponent
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
        CarEventHandlerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
