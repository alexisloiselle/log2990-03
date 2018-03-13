import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-password-form",
    templateUrl: "./password-form.component.html",
    styleUrls: ["./password-form.component.css"]
})

export class PasswordFormComponent implements OnInit {
    public requiresPermission: boolean = true;
    public validPassword: boolean = false;
    public error: boolean = false;
    public password: string;

    public constructor(private authService: AuthService, private router: Router) { }

    public ngOnInit(): void {
    }

    public async validatePassword(password: string): Promise<void> {
        this.error = false;
        await this.authService.connect(password).then((isOk) => this.grantAccess(isOk));
    }

    private grantAccess(isValid: boolean): void {
        if (isValid) {
            this.validPassword = true;
            this.router.navigateByUrl("/passwordChange");
        } else {
            this.error = true;
        }
        this.password = "";
    }
}
