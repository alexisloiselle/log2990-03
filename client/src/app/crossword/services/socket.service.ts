import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable()
export class SocketService {

    private socket: SocketIOClient.Socket;

    public constructor() {}

    public connect(): void {
        this.socket = io("http://localhost:3000/");
    }
}
