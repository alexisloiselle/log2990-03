import { AfterViewInit, Component, ElementRef, ViewChild, HostListener } from "@angular/core";
import { RenderService } from "../../render-service/render.service";
import { Car } from "../car/car";
import { HudService } from "../../render-service/hud.service";
import { NUMBER_OF_LAPS } from "../../config";
import { BestTimeService } from "./best-times-array/best-time.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "app-game-component",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.css"]
})
export class GameComponent implements AfterViewInit {

    @ViewChild("container")
    private containerRef: ElementRef;
    protected raceDone: boolean;

    public constructor(
        private renderService: RenderService,
        protected hudService: HudService,
        private bestTimeService: BestTimeService,
        private route: ActivatedRoute
    ) {
        this.raceDone = false;
        this.listenRaceEnd();
    }

    private listenRaceEnd(): void {
        this.renderService.EndRaceSub.subscribe(async (res) => {
            await this.bestTimeService.initialize(res.track, res.time);
            this.raceDone = true;
        });
    }

    @HostListener("window:resize", ["$event"])
    public onResize(): void {
        this.renderService.onResize();
    }

    @HostListener("window:keydown", ["$event"])
    public onKeyDown(event: KeyboardEvent): void {
        this.renderService.handleKeyDown(event);
    }

    @HostListener("window:keyup", ["$event"])
    public onKeyUp(event: KeyboardEvent): void {
        this.renderService.handleKeyUp(event);
    }

    public ngAfterViewInit(): void {
        let raceTrackId: string;
        this.route.params.subscribe((params) => {
            raceTrackId = params.raceTrackId;
        });
        this.renderService
            .initialize(this.containerRef.nativeElement, raceTrackId)
            .then(/* do nothing */)
            .catch((err) => console.error(err));
    }

    public get NumberOfLaps(): number {
        return NUMBER_OF_LAPS;
    }

    public get car(): Car {
        return this.renderService.car;
    }

}
