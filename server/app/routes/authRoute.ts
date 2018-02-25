import { Request, Response, NextFunction } from "express";
import { injectable, } from "inversify";
import {MongoClient} from "mongodb";
// tslint:disable:only-arrow-functions

const MONGO_URL: string = "mongodb://admin:password@ds233218.mlab.com:33218/log2990-03-db";

module Route {
    @injectable()
    export class AuthRoute {
    public auth(req: Request, res: Response, next: NextFunction): void {
        // tslint:disable-next-line:no-any
        require("mongodb").MongoClient.connect(MONGO_URL, function (err: any, db: MongoClient): void {
            // tslint:disable-next-line:typedef
            const collection = db.db("log2990-03-db");
            // tslint:disable-next-line:no-any
            collection.collection("admin").findOne({ value: "password" }, function (findErr: any, doc: any): void {
                const isPassOk: boolean = (req.body.password === doc.password);
                res.send(JSON.stringify(isPassOk));
                });
            db.close();
        });
    }
    public changePassword(req: Request, res: Response, next: NextFunction): void {
        // tslint:disable-next-line:no-any
        require("mongodb").MongoClient.connect(MONGO_URL, function (err: any, db: MongoClient): void {
            // tslint:disable-next-line:typedef
            const collection = db.db("log2990-03-db");
            collection.collection("admin").updateOne({ value: "password"}, { $set: { password: req.body.newPassword } }, null,
                                                     // tslint:disable-next-line:no-any
                                                     function (updateErr: any, updateDb: any): void {
                const isOk: boolean = (updateErr === null);
                res.send(JSON.stringify(isOk));
            });
            db.close();
        });
        }
    }
}
export = Route;
