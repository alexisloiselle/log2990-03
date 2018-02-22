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

    private userName: string;
    private password: string;
    private error: boolean;
    public validPassword = false;


     public validateUserNameAndPassword(): void {
        this.error = false;
        this.authService.connect(this.password).then(isOk => this.grantAccess(isOk));
        this.authService.connect(this.userName).then(isOk => this.grantAccess(isOk));
    }

    private grantAccess(isValid: boolean): void {
        if (isValid) {
            this.success.emit(undefined);
            this.validPassword = true;
        } else {
            this.error = true;
        }
        this.password = "";
    }
}
