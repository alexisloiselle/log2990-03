import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SocketService {

    private socket: SocketIOClient.Socket;

    public constructor() {}

    public connect(): void {
        this.socket = io("http://localhost:3000/");
    }

    public joinGame(gameName: string): void {
        this.socket.emit("joinGame", gameName);
    }

    public newGame(gameName: string): void {
        this.socket.emit("newGame", gameName);
    }

    public gameBegin(): Observable<boolean> {
        // tslint:disable-next-line:no-unnecessary-local-variable
        const observable: Observable<boolean> = new Observable((observer) => {
            this.socket.on("gameBegin", (data: boolean) => {
                observer.next(data);
            });

            return() => {
                this.socket.disconnect();
            };
        });

        return observable;
    }

}
