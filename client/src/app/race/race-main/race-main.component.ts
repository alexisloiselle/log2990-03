import { Component, OnInit} from "@angular/core";
import {AuthService} from "../../admin/auth/auth.service"
import {Router} from "@angular/router";
@Component({
    selector: "app-race-main",
    templateUrl: "./race-main.component.html",
    styleUrls: ["./race-main.component.css"]
})

export class RaceMainComponent implements OnInit {
    public constructor(private authService: AuthService, private router: Router) { 

    }

    public ngOnInit(): void { }
    private error: boolean;
    public validPassword = false;

     public validate(passwordInput: string, userName: string): void {
        this.error = false;
        if (userName === "admin")
        {
        this.authService.connect(passwordInput).then(isOk => this.grantAccess(isOk));
        }
        else 
        {this.grantAccess(false)};
    }

    private grantAccess(isValid: boolean): void {
        if (isValid) {
            this.validPassword = true;
            this.router.navigateByUrl("/admin");
        } else {
            this.error = true;
        }
    }
}
