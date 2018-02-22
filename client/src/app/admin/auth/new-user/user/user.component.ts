import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() public success: EventEmitter<any> = new EventEmitter();
  public requiresPermission: boolean = true;
  public validPassword: boolean = false;
  public validUserName: boolean = false;
  public error: boolean = false;
  public password: string;
  public userName: string;
  

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  public validatePassword(): void {
    this.error = false;
    this.authService.connect(this.userName).then(isOk => this.grantAccess(isOk));
    this.authService.connect(this.password).then(isOk => this.grantAccess(isOk));
}

private grantAccess(isValid: boolean): void {
    if (isValid) {
        this.success.emit(undefined);
        this.validPassword = true;
        this.validUserName = true;
    } else {
        this.error = true;
    }
    this.password = "";
}

}
