import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})

export class ChangePasswordComponent implements OnInit {
  public requiresPermission: boolean = true;
  public error: string;

  public constructor( private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
  }
  public changePassword(password: string, confirmPassword: string): void {
    if (password === confirmPassword) {
        this.error = undefined;
        this.authService.changePassword(password).then((isOk) => this.onSuccess(isOk));
    } else {
        this.error = "Les mots de passe ne sont pas les memes";
    }
}
  public onSuccess(isOk: boolean): void {
    if (isOk) {
        alert("Le mot de passe a été changé !");
        this.router.navigateByUrl("/admin");
    } else {
        this.error = "Erreur de modification du mot de passe";
    }
  }
}
