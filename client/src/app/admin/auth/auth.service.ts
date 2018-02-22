import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/toPromise";

@Injectable()
export class AuthService {
  private isAdminValue: boolean;
  private authenticateUrl = "http://localhost:3000/race";
  private changePasswordUrl = "http://localhost:3000/passwordChange";

  constructor(private http: HttpClient) {
    this.isAdminValue = false;
   }
 
    public get isAdmin() {
        return this.isAdminValue;
    }
    public connect(userName:string, password: string): Promise<boolean> {
      const body = { userName: userName, password: password} ;
      return this.http.post(this.authenticateUrl, body)
          .toPromise()
          .then(response => {
              this.isAdminValue = response as boolean;
              return this.isAdmin;
          })
          .catch(this.handleError);
  }

  public disconnect(): void {
      this.isAdminValue = false;
  }

  public changePassword(newPassword: string): Promise<boolean> {
      const body = { newPassword: newPassword };
      return this.http.put(this.changePasswordUrl, body)
          .toPromise().
          then(response => response as boolean)
          .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); 
      return Promise.reject(error.message || error);
  }
}




 

  
