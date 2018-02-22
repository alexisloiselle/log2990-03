import { Request, Response, NextFunction } from "express";
import { injectable, } from "inversify";

const MONGO_URL = "mongodb://lesChats:ChatonsRoux123@ds233218.mlab.com:33218/log2990-03-db";

module Route {

    @injectable()
    export class AuthRoute {
    public auth(req: Request, res: Response, next: NextFunction) {
    require('mongodb').MongoClient.connect(MONGO_URL, function (err: any, db: any) {
        const collection = db.collection('options');
        collection.findOne({ _id: 'password' }, function (findErr: any, doc: any) {
            const isPassOk = req.body.password === doc.value;
            res.send(JSON.stringify(isPassOk));
        });
        db.close();
     });
    }

    public changePassword(req: Request, res: Response, next: NextFunction) {
    require('mongodb').MongoClient.connect(MONGO_URL, function (err: any, db: any) {
        const collection = db.collection('options');
        collection.updateOne({ _id: 'password' }, { $set: { value: req.body.newPassword } }, null,
            function (updateErr: any, updateDb: any) {
                const isOk = updateErr === null;
                res.send(JSON.stringify(isOk));
            });
        db.close();
        });
        }
    }
}
export = Route;