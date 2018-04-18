import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../admin/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-race-main",
    templateUrl: "./race-main.component.html",
    styleUrls: ["./race-main.component.css"]
})

export class RaceMainComponent implements OnInit {
    public validPassword: boolean = false;
    public error: boolean;

    public constructor(private authService: AuthService, private router: Router) { }

    public ngOnInit(): void { }

    public async validate(passwordInput: string, userName: string): Promise<void> {
        if (userName === "admin") {
            await this.authService.connect(passwordInput).then((isOk) => this.grantAccess(isOk));
        } else {
            this.grantAccess(false);
        }
    }

    public grantAccess(isValid: boolean): void {
        if (isValid) {
            this.error = false;
            this.validPassword = true;
            this.router.navigateByUrl("/admin");
        } else {
            this.error = true;
        }
    }
}
