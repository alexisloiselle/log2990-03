import { Request, Response, NextFunction } from "express";
import { injectable, } from "inversify";
import { MongoClient, MongoError, Db } from "mongodb";

const MONGO_URL: string = "mongodb://admin:password@ds233218.mlab.com:33218/log2990-03-db";

module Route {
    @injectable()
    export class AuthRoute {
        public auth(req: Request, res: Response, next: NextFunction): void {
            require("mongodb").MongoClient.connect(MONGO_URL, async (err: MongoError, client: MongoClient) => {
                const collection: Db = client.client("log2990-03-db");
                collection.collection("admin").findOne(
                    { value: "password" },
                    (findErr: MongoError, doc: { password: string }) => {
                        const isPassOk: boolean = (req.body.password === doc.password);
                        res.send(JSON.stringify(isPassOk));
                    });
                await client.close();
            });
        }
        public changePassword(req: Request, res: Response, next: NextFunction): void {
            require("mongodb").MongoClient.connect(MONGO_URL, async (err: MongoError, client: MongoClient) => {
                const collection: Db = client.client("log2990-03-db");
                collection.collection("admin").updateOne(
                    { value: "password" },
                    { $set: { password: req.body.newPassword } },
                    null,
                    (updateErr: MongoError) => {
                        const isOk: boolean = (updateErr === null);
                        res.send(JSON.stringify(isOk));
                    });
                await client.close();
            });
        }
    }
}
export = Route;
