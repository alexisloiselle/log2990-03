import { injectable, } from "inversify";
import * as express from "express";
import { MongoClient, ObjectId, Db, MongoError } from "mongodb";

const MONGO_URL: string = "mongodb://admin:password@ds233218.mlab.com:33218/log2990-03-db";
const ERROR_NUMBER: number = 500;

module Route {
    @injectable()
    export class TrackRoute {

        public addTrack(req: express.Request, res: express.Response, next: express.NextFunction): void {
            require("mongodb").MongoClient.connect(MONGO_URL, async (err: MongoError, client: MongoClient) => {
                req.body._id = undefined;
                const db: Db = client.db("log2990-03-db");
                db.collection("tracks").insertOne(req.body, (insertErr: MongoError) => {
                    const isOk: boolean = (insertErr === null);
                    res.send(JSON.stringify(isOk));
                });
                await client.close();
            });
        }

        public getTracks(req: express.Request, res: express.Response, next: express.NextFunction): void {
            require("mongodb").MongoClient.connect(MONGO_URL, (err: MongoError, client: MongoClient) => {
                const db: Db = client.db("log2990-03-db");
                db.collection("tracks").find({}).toArray((findErr: MongoError, docs: {_id: string, track: string}[]) => {
                    if (findErr === null) {
                        res.send(JSON.stringify(docs));
                    } else {
                        res.status(ERROR_NUMBER).send(JSON.stringify(findErr));
                    }
                });
                client.close();
            });
        }

        public getTrack(req: express.Request, res: express.Response, next: express.NextFunction): void {
            require("mongodb").MongoClient.connect(MONGO_URL, (err: MongoError, client: MongoClient) => {
                const collection: Db = client.db("log2990-03-db");
                collection.collection("tracks").findOne(
                    { _id: new ObjectId(req.params.id) },
                    (findErr: MongoError, doc: {_id: string, track: string}) => {
                        if (findErr === null) {
                            res.send(JSON.stringify(doc));
                        } else {
                            res.status(ERROR_NUMBER).send(JSON.stringify(findErr));
                        }
                    });
                client.close();
            });
        }

        public updateTrack(req: express.Request, res: express.Response, next: express.NextFunction): void {
            require("mongodb").MongoClient.connect(MONGO_URL, (err: MongoError, client: MongoClient) => {
                const db: Db = client.db("log2990-03-db");
                db.collection("tracks").updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: { "track": req.body.$set } }, (updateErr: MongoError) => {
                        const isOk: boolean = updateErr === null;
                        res.send(JSON.stringify(isOk));
                    });
                client.close();
            });
        }

        public deleteTrack(req: express.Request, res: express.Response, next: express.NextFunction): void {
            require("mongodb").MongoClient.connect(MONGO_URL, (err: MongoError, client: MongoClient) => {
                const db: Db = client.db("log2990-03-db");
                db.collection("tracks").remove(
                    { _id: new ObjectId(req.params.id) },
                    (deleteErr: MongoError) => {
                        const isOk: boolean = (deleteErr === null);
                        res.send(JSON.stringify(isOk));
                    });
                client.close();
            });
        }
    }
}

export = Route;
