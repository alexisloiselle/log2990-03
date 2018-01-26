import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { GameComponent } from "./game-component/game.component";

import { RenderService } from "./render-service/render.service";
import { BasicService } from "./basic.service";
import { GridComponent } from './grid/grid.component';
import { TrackEditorComponent } from './track-editor/track-editor.component';
import { RaceTrackComponent } from './race-track/race-track.component';

import { GameService} from './game.service';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        GridComponent,
        TrackEditorComponent,
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
