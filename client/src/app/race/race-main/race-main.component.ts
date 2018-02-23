import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {AuthService} from "../../admin/auth/auth.service"
@Component({
    selector: "app-race-main",
    templateUrl: "./race-main.component.html",
    styleUrls: ["./race-main.component.css"]
})

export class RaceMainComponent implements OnInit {
    @Output() public success: EventEmitter<any> = new EventEmitter();
    public constructor(private authService: AuthService) { 

    }

    public ngOnInit(): void { }
    private error: boolean;
    public validPassword = false;

     public validate(passwordInput: string): void {
        this.error = false;
        this.authService.connect(passwordInput).then(isOk => this.grantAccess(isOk));
    }

    private grantAccess(isValid: boolean): void {
        if (isValid) {
            console.log("ISVALID");
            this.success.emit(undefined);
            this.validPassword = true;
        } else {
            this.error = true;
        }
    }
}
