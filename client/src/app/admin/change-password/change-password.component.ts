import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})


export class ChangePasswordComponent implements OnInit {
  public requiresPermission = true;
  public password: string;
  public confirmPassword: string;
  public error: string;

  constructor( private authService: AuthService, private location: Location) { }

  ngOnInit() {
  }
  public changePassword(): void {
    if (this.password === this.confirmPassword) {
        this.error = undefined;
        this.authService.changePassword(this.password).then(isOk => this.onSuccess(isOk));
    } else {
        this.error = "le mots de passe ne fonctionne pas";
    }
}
  public onSuccess(isOk: boolean): void {
    if (isOk) {
        alert("Le mot de passe a été changé !");
        this.goBack();
    } else {
        this.error = "Erreur de modification du mot de passe";
    }
}
  public goBack(): void {
    this.location.back();
  }

}






