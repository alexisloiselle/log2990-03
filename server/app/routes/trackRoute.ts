import { injectable, } from "inversify";
import * as express from "express";
import { MongoClient, ObjectId } from "mongodb";

const MONGO_URL: string = "mongodb://admin:password@ds233218.mlab.com:33218/log2990-03-db";
const ERROR_NUMBER: number = 500;

module Route {
    @injectable()
    export class TrackRoute {

        public addTrack(req: express.Request, res: express.Response, next: express.NextFunction): void {
            // tslint:disable-next-line:no-any
            require("mongodb").MongoClient.connect(MONGO_URL, async (err: any, db: MongoClient) => {
                req.body._id = undefined;
                // tslint:disable-next-line:no-any
                const collection: any = db.db("log2990-03-db");
                // tslint:disable-next-line:no-any
                collection.collection("tracks").insertOne(req.body, (insertErr: any, insertDb: any) => {
                    const isOk: boolean = (insertErr === null);
                    res.send(JSON.stringify(isOk));
                });
                await db.close();
            });
        }

        public getTracks(req: express.Request, res: express.Response, next: express.NextFunction): void {
            // tslint:disable-next-line:no-any
            require("mongodb").MongoClient.connect(MONGO_URL, (err: any, db: any) => {
                // tslint:disable-next-line:no-any
                const collection: any = db.db("log2990-03-db");
                // tslint:disable-next-line:no-any
                collection.collection("tracks").find({}).toArray((findErr: any, docs: any) => {
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
            require("mongodb").MongoClient.connect(MONGO_URL, (err: any, db: any) => {
                // tslint:disable-next-line:no-any
                const collection: any = db.db("log2990-03-db");
                collection.collection("tracks").findOne(
                    { _id: new ObjectId(req.params.id) },
                    // tslint:disable-next-line:no-any
                    (findErr: any, doc: any) => {
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
            require("mongodb").MongoClient.connect(MONGO_URL, (err: any, db: any) => {
                // tslint:disable-next-line:no-any
                const collection: any = db.db("log2990-03-db");
                collection.collection("tracks").updateOne(
                    { _id: new ObjectId(req.params.id) },
                    // tslint:disable-next-line:no-any
                    { $set: { "track": JSON.stringify(req.body.$set) } }, (updateErr: any, updateDb: any) => {
                        const isOk: boolean = updateErr === null;
                        res.send(JSON.stringify(isOk));
                    });
                db.close();
            });
        }

        public deleteTrack(req: express.Request, res: express.Response, next: express.NextFunction): void {
            // tslint:disable-next-line:no-any
            require("mongodb").MongoClient.connect(MONGO_URL, (err: any, db: any) => {
                // tslint:disable-next-line:no-any
                const collection: any = db.db("log2990-03-db");
                collection.collection("tracks").remove(
                    { _id: new ObjectId(req.params.id) },
                    // tslint:disable-next-line:no-any
                    (deleteErr: any, deleteDb: any) => {
                        const isOk: boolean = (deleteErr === null);
                        res.send(JSON.stringify(isOk));
                    });
                db.close();
            });
        }
    }
}

export = Route;
