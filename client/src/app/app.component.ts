import { Component, OnInit } from "@angular/core";

import { BasicService } from "./basic.service";
import { Message } from "../../../common/communication/message";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

    public constructor(private basicService: BasicService) { }

    public readonly teamName: string = "Chats";
    public message: string = "Sprint 1 terminé ";

    public ngOnInit(): void {
        this.basicService.basicGet().subscribe((message: Message) => this.message = message.title + message.body);
    }
}
