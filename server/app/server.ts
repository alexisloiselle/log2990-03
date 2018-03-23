import { Application } from "./app";
import * as http from "http";
import Types from "./types";
import { injectable, inject } from "inversify";
import { IServerAddress } from "./iserver.address";
import { } from "socket.io";

@injectable()
export class Server {

    private readonly appPort: string | number | boolean = this.normalizePort(process.env.PORT || "3000");
    private readonly baseDix: number = 10;
    private server: http.Server;
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

            console.log("a user connected");
            socket.on("disconnect", () => {
                console.log("user disconnected");
            });

            socket.on("joinGame", (gameName: string) => {
                console.log("woot woot it's the sound of the police");
                console.log(this.crosswordGames);
                // for (let i: number = 0; i < this.crosswordGames.length; i++) {
                for (const game of this.crosswordGames) {
                    if (gameName === game[0]) {
                        if (game[1] < 2) {
                            socket.join(gameName);
                            console.log("A user joined " + gameName);
                            game[1]++;
                            socket.to(gameName).emit("gameBegin", true);
                        }
                    }
                }
            });

            socket.on("newGame", (gameName: string) => {
                const tempGame: [string, number] = [gameName, 1];
                this.crosswordGames.push(tempGame);
                console.log(this.crosswordGames);
                console.log("Game " + gameName + " has been created");
                socket.join(gameName);
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
