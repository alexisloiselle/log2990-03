import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {
  @Output() public success: EventEmitter<any> = new EventEmitter();
  public requiresPermission = true;
  public validPassword = false;
  public error = false;
  public password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  
    public validatePassword(): void {
        this.error = false;
        this.authService.connect(this.password).then(isOk => this.grantAccess(isOk));
    }

    private grantAccess(isValid: boolean): void {
        if (isValid) {
            this.success.emit(undefined);
            this.validPassword = true;
        } else {
            this.error = true;
        }
        this.password = '';
    }
}


