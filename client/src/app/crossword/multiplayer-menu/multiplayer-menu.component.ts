import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-multiplayer-menu",
    templateUrl: "./multiplayer-menu.component.html",
    styleUrls: ["./multiplayer-menu.component.css"]
})
export class MultiplayerMenuComponent implements OnInit {

    public constructor(private router: Router) { }

    public ngOnInit(): void {
    }

    public goToCreateGame(): void {
        this.router.navigateByUrl("create-game");
    }

    public goToJoinGame(): void {
        this.router.navigateByUrl("join-game");
    }

}
