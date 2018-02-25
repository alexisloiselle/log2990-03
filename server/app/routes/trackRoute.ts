import { injectable, } from "inversify";
import * as express from 'express';
import {MongoClient} from "mongodb";

const MONGO_URL = "mongodb://admin:password@ds233218.mlab.com:33218/log2990-03-db";
const ObjectId = require('mongodb').ObjectID;

module Route {
    @injectable()
    export class TrackRoute {

        public addTrack(req: express.Request, res: express.Response, next: express.NextFunction) {
            require('mongodb').MongoClient.connect(MONGO_URL, function (err: any, db: MongoClient) {
                if (err){console.log(err);}
                req.body._id = undefined;
                const collection = db.db("log2990-03-db");
                collection.collection("tracks").insertOne(req.body, function (insertErr: any, insertDb: any) {
                    const isOk = (insertErr === null);
                    res.send(JSON.stringify(isOk));
                });
                db.close();
            });
        }

        public getTracks(req: express.Request, res: express.Response, next: express.NextFunction) {
            require('mongodb').MongoClient.connect(MONGO_URL, function (err: any, db: any) {
                if (err){console.log(err);}
                const collection = db.db("log2990-03-db");
                collection.collection("tracks").find({}).toArray(function (findErr: any, docs: any) {
                    if (findErr === null) {
                        res.send(JSON.stringify(docs));
                    } else {
                        res.status(500).send(JSON.stringify(findErr));
                    }
                });
                db.close();
            });
        }

        public getTrack(req: express.Request, res: express.Response, next: express.NextFunction) {
            require('mongodb').MongoClient.connect(MONGO_URL, function (err: any, db: any) {
                if (err){console.log(err);}
                const collection = db.db("log2990-03-db");
                collection.collection("tracks").findOne({ _id: new ObjectId(req.params.id) }, function (findErr: any, doc: any) {
                    if (findErr === null) {
                        res.send(JSON.stringify(doc));
                    } else {
                        res.status(500).send(JSON.stringify(findErr));
                    }
                });
                db.close();
            });
        }

        public updateTrack(req: express.Request, res: express.Response, next: express.NextFunction) {
            require('mongodb').MongoClient.connect(MONGO_URL, function (err: any, db: any) {
                if (err){console.log(err);}
                const collection = db.db("log2990-03-db");
                collection.collection("tracks").updateOne({ _id: new ObjectId(req.params.id) }, req.body, function (updateErr: any, updateDb: any) {
                    const isOk = updateErr === null;
                    res.send(JSON.stringify(isOk));
                });
                db.close();
            });
        }

        public deleteTrack(req: express.Request, res: express.Response, next: express.NextFunction) {
            require('mongodb').MongoClient.connect(MONGO_URL, function (err: any, db: any) {
                if (err){console.log(err);}
                const collection = db.db("log2990-03-db");
                collection.collection("tracks").remove({ _id: new ObjectId(req.params.id) }, function (deleteErr: any, deleteDb: any) {
                    const isOk = (deleteErr === null);
                    res.send(JSON.stringify(isOk));
                    console.log(isOk);
                });
                db.close();
            });
        }
    }
}

export = Route;