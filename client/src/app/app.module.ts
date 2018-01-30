import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { GameComponent } from "./game-component/game.component";

import { RenderService } from "./render-service/render.service";
import { BasicService } from "./basic.service";
import { GridComponent } from './grid/grid.component';
import { TrackEditorComponent } from './track-editor/track-editor.component';

import { GameService} from './game.service';
import { TrackListComponent } from './track-list/track-list.component';
import { RaceTrackComponent } from './race-track/race-track.component';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        GridComponent,
        TrackEditorComponent,
        TrackListComponent,
        RaceTrackComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        RenderService,
        BasicService,
        GameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
