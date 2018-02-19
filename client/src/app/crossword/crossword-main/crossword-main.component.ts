import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-crossword-main",
    templateUrl: "./crossword-main.component.html",
    styleUrls: ["./crossword-main.component.css"]
})

export class CrosswordMainComponent implements OnInit {

    public constructor(private router: Router) { }

    public ngOnInit(): void {
    }

    public goToSinglePlayer(): void {
        this.router.navigateByUrl("single-player");
    }

    public goToMultiplayer(): void {
        this.router.navigateByUrl("multiplayer");
    }

}
