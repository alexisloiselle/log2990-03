import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import Types from "./types";
import { injectable, inject } from "inversify";
import { Routes } from "./routes";
import { LexiconRoute } from "./routes/lexiconRoute";
import { CrosswordRoute } from "./routes/crosswordRoute";
import {AuthRoute } from "./routes/authRoute";
import {TrackRoute} from "./routes/trackRoute";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    constructor(@inject(Types.Routes) private api: Routes) {
        this.app = express();

        this.config();

        this.routes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "../client")));
        this.app.use(cors());
    }

    public routes(): void {
        const router: express.Router = express.Router();
        router.use(this.api.routes);

        const lexicon: LexiconRoute = new LexiconRoute();
        const crossword: CrosswordRoute = new CrosswordRoute();
        const auth: AuthRoute = new AuthRoute();
        const track: TrackRoute = new TrackRoute();

        router.get("/lexicon", lexicon.getAllWords);
        router.get("/lexicon/definition/:word", lexicon.getDefinitions);
        router.get("/lexicon/common/:pattern", lexicon.getCommonWithPattern);
        router.get("/lexicon/uncommon/:pattern", lexicon.getUncommonWithPattern);
        router.get("/crossword/:difficulty", crossword.getGrid);

        //router.post("/auth", function(req:express.Request, res: express.Response, next: express.NextFunction){
            //console.log("rentreNouvelleFonction");
           // res.send("hello");
        //});
        router.post("/auth/:body", auth.auth.bind(auth.auth));
        router.put("/change-password/:body", auth.changePassword.bind(auth.changePassword));

        router.post("/tracks/add", track.addTrack.bind(track.addTrack));
        router.get("/tracks/all", track.getTracks.bind(track.getTracks));
        router.get("/tracks/:id", track.getTrack.bind(track.getTrack));
        router.put("/tracks/:id", track.updateTrack.bind(track.updateTrack));
        router.delete("/tracks/:id", track.deleteTrack.bind(track.deleteTrack));

        
        this.app.use("/api", router);

        this.errorHandeling();
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {}
            });
        });
    }
}
