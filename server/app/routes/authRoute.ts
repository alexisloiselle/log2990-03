import { Request, Response, NextFunction } from "express";
import { injectable, } from "inversify";
import {MongoClient} from "mongodb";

const MONGO_URL = "mongodb://admin:password@ds233218.mlab.com:33218/log2990-03-db";

module Route {
    @injectable()
    export class AuthRoute {
    
    public auth(req: Request, res: Response, next: NextFunction) {
        require("mongodb").MongoClient.connect(MONGO_URL, function (err: any, db: MongoClient) {
            if (err){console.log(err); }
            const collection = db.db("log2990-03-db");
            collection.collection("admin").findOne({ password: "password" }, function (findErr: any, doc: any) {
                const isPassOk: boolean = (req.body.password === doc.password); 
                res.send(JSON.stringify(isPassOk));;
                });
            db.close();
        });
    }
    public changePassword(req: Request, res: Response, next: NextFunction) {
        require("mongodb").MongoClient.connect(MONGO_URL, function (err: any, db: MongoClient) {
            if (err){console.log(err); }
            const collection = db.db("log2990-03-db");
            collection.collection("admin").updateOne({ id: "password" }, { $set: { value: req.body.newPassword } }, null,
            function (updateErr: any, updateDb: any) {
                const isOk = (updateErr === null);
                res.send(JSON.stringify(isOk));
            });
        db.close();
        });
        }
    }
}
export = Route;