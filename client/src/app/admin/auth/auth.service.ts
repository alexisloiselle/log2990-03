import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/toPromise";
import { API_URL } from "../../config";

@Injectable()
export class AuthService {
    private readonly AUTH_URL: string = `${API_URL}/auth`;
    private readonly PASSWORD_URL: string = `${API_URL}/passwordChange`;

    public constructor(private http: HttpClient) {}

    public async connect(password: string): Promise<boolean> {
        const body: { password: string } = { password: password };

        return this.http.post(this.AUTH_URL, body)
            .toPromise()
            .then((response: boolean) => response)
            .catch(async (error: Error) => this.handleError<boolean>(error));
    }

    public async changePassword(newPassword: string): Promise<boolean> {
        const body: { newPassword: string } = { newPassword: newPassword };

        return this.http.put(this.PASSWORD_URL, body)
            .toPromise()
            .then((response: boolean) => response)
            .catch(async (error: Error) => this.handleError<boolean>(error));
    }

    private async handleError<T>(error: Error): Promise<T> {
        return Promise.reject(error.message);
    }
}
