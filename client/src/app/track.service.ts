import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {RaceTrack} from "./race/raceTrack";

@Injectable()
export class TrackService {

    public constructor(private http: HttpClient) { }

    private baseUrl: string = "http://localhost:3000/api/tracks";

    public async getTracks(): Promise<RaceTrack[]> {
        return this.http.get(this.baseUrl + "/all")
            .toPromise()
            .then((response) => {
                // tslint:disable-next-line:no-any
                const tracks: any[] = [];
                tracks.push(response);

                return tracks;
            })
            .catch(this.handleError);
    }

    public async getTrack(id: string): Promise<RaceTrack> {
        return this.http.get(this.baseUrl + "/" + id)
            .toPromise()
            .then((response) => {

                return (response); })
            .catch(this.handleError);
    }

    public async addTrack(track: RaceTrack): Promise<boolean> {
        // tslint:disable-next-line:no-any
        const body: any = { track : JSON.stringify(track)};

        return  this.http.post(this.baseUrl + "/add", body)
            .toPromise()
            .then((response) => response as boolean)
            .catch(this.handleError);
    }

    public async updateTrack(id: string, track: RaceTrack): Promise<boolean> {
        if (id === undefined) {
            throw new Error("Impossible to update a track without an id.");
        }
        // tslint:disable-next-line:no-any
        const update: any = { $set: track };

        return this.http.put(this.baseUrl + "/" + id, update)
            .toPromise()
            .then((response) => response as boolean)
            .catch(this.handleError);
    }

    public async deleteTrack(id: string): Promise<boolean> {
        if (id === undefined) {
            throw new Error("Impossible to delete a track without a valid id");
        }

        return this.http.delete(this.baseUrl + "/" + id)
            .toPromise()
            .then((response) => response as boolean)
            .catch(this.handleError);
    }

    // tslint:disable-next-line:no-any
    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);

        return Promise.reject(error.message || error);
    }
}
