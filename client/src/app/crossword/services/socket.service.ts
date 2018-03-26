import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SocketService {

    private socket: SocketIOClient.Socket;

    public constructor() { }

    public connect(): void {
        // TODO url dans le fichier src/app/config.ts
        this.socket = io("http://localhost:3000/");
    }

    public joinGame(gameName: string): void {
        // TODO je sais pas si faudrait mettre les string dans des constantes globales, a voir
        this.socket.emit("joinGame", gameName);
    }

    public newGame(gameName: string): void {
        // TODO encore une fois constante, a voir
        this.socket.emit("newGame", gameName);
    }

    public gameBegin(): Observable<boolean> {
        return new Observable((observer) => {
            // TODO encore une fois constante, a voir
            this.socket.on("gameBegin", (data: boolean) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
    }

}
