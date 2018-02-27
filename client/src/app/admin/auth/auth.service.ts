import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AuthService {
    private isAdminValue: boolean;
    private passwordChanged: boolean;
    private authenticateUrl: string = "http://localhost:3000/api/auth";
    private changePasswordUrl: string = "http://localhost:3000/api/passwordChange";

    public constructor(private http: HttpClient) {
        this.isAdminValue = false;
        this.passwordChanged = false;
    }

    public get isAdmin(): boolean {
        return this.isAdminValue;
    }

    public connect(password: string): Promise<boolean> {
        // tslint:disable-next-line:no-any
        const body: any = { password: password };

        return this.http.post(this.authenticateUrl, body)
            .toPromise()
            .then((response) => {
                this.isAdminValue = response as boolean;

                return this.isAdmin;
            })
            .catch(this.handleError);

    }

    public disconnect(): void {
        this.isAdminValue = false;
    }

    public async changePassword(newPassword: string): Promise<boolean> {
        // tslint:disable-next-line:no-any
        const body: any = { newPassword: newPassword };

        return this.http.put(this.changePasswordUrl, body)
            .toPromise()
            // tslint:disable-next-line:no-unused-expression
            .then((response) => {
                this.passwordChanged = response as boolean;

                return this.passwordChanged;
            })
            .catch(this.handleError);
    }

    // tslint:disable-next-line:typedef
    // tslint:disable-next-line:no-any
    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);

        return Promise.reject(error.message || error);
    }
}
