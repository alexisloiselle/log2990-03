import { Request, Response, NextFunction } from "express";
import { injectable, } from "inversify";
import { MongoClient } from "mongodb";

const MONGO_URL: string = "mongodb://admin:password@ds233218.mlab.com:33218/log2990-03-db";

module Route {
    @injectable()
    export class AuthRoute {
        public auth(req: Request, res: Response, next: NextFunction): void {
            // tslint:disable-next-line:no-any
            require("mongodb").MongoClient.connect(MONGO_URL, async (err: any, db: MongoClient) => {
                // tslint:disable-next-line:typedef
                const collection = db.db("log2990-03-db");
                collection.collection("admin").findOne(
                    { "gameName.gameName": req },
                    // tslint:disable-next-line:no-any
                    (findErr: any, doc: any) => {
                        const isPassOk: boolean = (req.body.password === doc.password);
                        res.send(JSON.stringify(isPassOk));
                    });
                await db.close();
            });
        }
        public changePassword(req: Request, res: Response, next: NextFunction): void {
            // tslint:disable-next-line:no-any
            require("mongodb").MongoClient.connect(MONGO_URL, async (err: any, db: MongoClient) => {
                // tslint:disable-next-line:typedef
                const collection = db.db("log2990-03-db");
                collection.collection("admin").updateOne(
                    { value: "password" },
                    { $set: { password: req.body.newPassword } },
                    null,
                    // tslint:disable-next-line:no-any
                    (updateErr: any, updateDb: any) => {
                        const isOk: boolean = (updateErr === null);
                        res.send(JSON.stringify(isOk));
                    });
                await db.close();
            });
        }
    }
}
export = Route;
