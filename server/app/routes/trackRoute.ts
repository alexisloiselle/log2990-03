import { injectable, } from "inversify";
import * as express from "express";
import {MongoClient, ObjectId} from "mongodb";
// tslint:disable:only-arrow-functions

const MONGO_URL: string = "mongodb://admin:password@ds233218.mlab.com:33218/log2990-03-db";
const ERROR_NUMBER: number = 500;

module Route {
    @injectable()
    export class TrackRoute {

        public addTrack(req: express.Request, res: express.Response, next: express.NextFunction): void {
            // tslint:disable-next-line:no-any
            require("mongodb").MongoClient.connect(MONGO_URL, function (err: any, db: MongoClient): void {
                req.body._id = undefined;
                // tslint:disable-next-line:no-any
                const collection: any = db.db("log2990-03-db");
                // tslint:disable-next-line:no-any
                collection.collection("tracks").insertOne(req.body, function (insertErr: any, insertDb: any): void {
                    const isOk: boolean = (insertErr === null);
                    res.send(JSON.stringify(isOk));
                });
                db.close();
            });
        }

        public getTracks(req: express.Request, res: express.Response, next: express.NextFunction): void {
            // tslint:disable-next-line:no-any
            require("mongodb").MongoClient.connect(MONGO_URL, function (err: any, db: any): void {
                // tslint:disable-next-line:no-any
                const collection: any = db.db("log2990-03-db");
                // tslint:disable-next-line:no-any
                collection.collection("tracks").find({}).toArray(function (findErr: any, docs: any): void {
                    if (findErr === null) {
                        res.send(JSON.stringify(docs));
                    } else {
                        res.status(ERROR_NUMBER).send(JSON.stringify(findErr));
                    }
                });
                db.close();
            });
        }

        public getTrack(req: express.Request, res: express.Response, next: express.NextFunction): void {
            // tslint:disable-next-line:no-any
            require("mongodb").MongoClient.connect(MONGO_URL, function (err: any, db: any): void {
                // tslint:disable-next-line:no-any
                const collection: any = db.db("log2990-03-db");
                // tslint:disable-next-line:no-any
                collection.collection("tracks").findOne({ _id: new ObjectId(req.params.id) }, function (findErr: any, doc: any): void {
                    if (findErr === null) {
                        res.send(JSON.stringify(doc));
                    } else {
                        res.status(ERROR_NUMBER).send(JSON.stringify(findErr));
                    }
                });
                db.close();
            });
        }

        public updateTrack(req: express.Request, res: express.Response, next: express.NextFunction): void {
            // tslint:disable-next-line:no-any
            require("mongodb").MongoClient.connect(MONGO_URL, function (err: any, db: any): void {
                // tslint:disable-next-line:no-any
                const collection: any = db.db("log2990-03-db");
                console.log(req.body.$set);
                console.log(JSON.stringify(req.body.$set));
                collection.collection("tracks").updateOne({ _id: new ObjectId(req.params.id) },
                                                          // tslint:disable-next-line:no-any
                 {$set: {"track": JSON.stringify(req.body.$set)}}, function (updateErr: any, updateDb: any): void {
                                                        
                    const isOk: boolean = updateErr === null;
                    res.send(JSON.stringify(isOk));
                    console.log(isOk);
                });
                db.close();
            });
        }

        public deleteTrack(req: express.Request, res: express.Response, next: express.NextFunction): void {
            // tslint:disable-next-line:no-any
            require("mongodb").MongoClient.connect(MONGO_URL, function (err: any, db: any): void {
                // tslint:disable-next-line:no-any
                const collection: any = db.db("log2990-03-db");
                collection.collection("tracks").remove({ _id: new ObjectId(req.params.id) },
                                                       // tslint:disable-next-line:no-any
                                                       function (deleteErr: any, deleteDb: any): void {
                    const isOk: boolean = (deleteErr === null);
                    res.send(JSON.stringify(isOk));
                });
                db.close();
            });
        }
    }
}

export = Route;
