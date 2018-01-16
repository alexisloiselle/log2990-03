import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { GameComponent } from "./game-component/game.component";

import { RenderService } from "./render-service/render.service";
import { BasicService } from "./basic.service";
import { CaseComponent } from './case/case.component';
import { GridComponent } from './grid/grid.component';
import { GridManagerComponent } from './grid-manager/grid-manager.component';
import { GridCreatorComponent } from './grid-creator/grid-creator.component';
import { WordPlacerComponent } from './word-placer/word-placer.component';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        CaseComponent,
        GridComponent,
        GridManagerComponent,
        GridCreatorComponent,
        WordPlacerComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        RenderService,
        BasicService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
