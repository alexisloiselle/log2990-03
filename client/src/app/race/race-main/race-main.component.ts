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

     public validateUserNameAndPassword(passwordInput: string, userNameInput: string ): void {
        console.log("WRONG");
        this.error = false;
        console.log(userNameInput);
        console.log(passwordInput);
        this.authService.connect(userNameInput, passwordInput).then(isOk => this.grantAccess(isOk));
    }

    private grantAccess(isValid: boolean): void {
        if (isValid) {
            this.success.emit(undefined);
            this.validPassword = true;
        } else {
            this.error = true;
        }
    }
}
