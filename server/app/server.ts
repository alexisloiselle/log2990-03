import { Application } from "./app";
import * as http from "http";
import Types from "./types";
import { injectable, inject } from "inversify";
import { IServerAddress } from "./iserver.address";
import { } from "socket.io";
import { JOIN_GAME_EVENT, GAME_BEGIN_EVENT, NEW_GAME_EVENT, WORD_CORRECT } from "../../common/socket-constants";

@injectable()
export class Server {

    private readonly appPort: string | number | boolean = this.normalizePort(process.env.PORT || "3000");
    private readonly baseDix: number = 10;
    private server: http.Server;
    // tslint:disable-next-line:no-any
    private io: any;
    private crosswordGames: [string, number][];

    constructor(@inject(Types.Application) private application: Application) {
        this.crosswordGames = [];
    }

    // tslint:disable-next-line:max-func-body-length
    public init(): void {
        this.application.app.set("port", this.appPort);

        this.server = http.createServer(this.application.app);

        this.server.listen(this.appPort);
        this.server.on("error", (error: NodeJS.ErrnoException) => this.onError(error));
        this.server.on("listening", () => this.onListening());
        this.io = require("socket.io").listen(this.server);

        this.io.on("connection", (socket: SocketIO.Socket) => {

            socket.on(JOIN_GAME_EVENT, (gameName: string) => {
                for (const game of this.crosswordGames) {
                    if (gameName === game[0]) {
                        if (game[1] < 2) {
                            socket.join(gameName);
                            game[1]++;
                            socket.to(gameName).emit(GAME_BEGIN_EVENT, true);
                        }
                    }
                }
            });

            socket.on(NEW_GAME_EVENT, (gameName: string, playerName: string) => {
                const tempGame: [string, number] = [gameName, 1];
                this.crosswordGames.push(tempGame);
                socket.join(gameName);
                socket.emit(NEW_GAME_EVENT , {playerName,  isHost: true });
                socket.broadcast.emit(NEW_GAME_EVENT, {playerName, isHost: false });
            });
            socket.on(WORD_CORRECT , (Line: number, Column: number) => {
                socket.emit(WORD_CORRECT , {Line, Column, isHost: true });
                socket.broadcast.emit(WORD_CORRECT , {Line, Column, isHost: false });
            });
        });
    }

    private normalizePort(val: number | string): number | string | boolean {
        const port: number = (typeof val === "string") ? parseInt(val, this.baseDix) : val;
        if (isNaN(port)) {
            return val;
        } else if (port >= 0) {
            return port;
        } else {
            return false;
        }
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== "listen") { throw error; }
        const bind: string = (typeof this.appPort === "string") ? "Pipe " + this.appPort : "Port " + this.appPort;
        switch (error.code) {
            case "EACCES":
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Se produit lorsque le serveur se met à écouter sur le port.
     */
    private onListening(): void {
        const addr: IServerAddress = this.server.address();
        const bind: string = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
        // tslint:disable-next-line:no-console
        console.log(`Listening on ${bind}`);
    }
}
