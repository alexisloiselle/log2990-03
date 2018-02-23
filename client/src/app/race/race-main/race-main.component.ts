import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {AuthService} from "../../admin/auth/auth.service"
import {Router} from "@angular/router";
@Component({
    selector: "app-race-main",
    templateUrl: "./race-main.component.html",
    styleUrls: ["./race-main.component.css"]
})

export class RaceMainComponent implements OnInit {
    @Output() public success: EventEmitter<any> = new EventEmitter();
    public constructor(private authService: AuthService, private router: Router) { 

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
            this.success.emit(undefined);
            this.validPassword = true;
            this.router.navigateByUrl("/track-list");
        } else {
            this.error = true;
        }
    }
}
