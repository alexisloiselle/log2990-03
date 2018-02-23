import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RaceTrackComponent } from "./race/race-track/race-track.component";

@Injectable()
export class TrackService {

    public constructor(private http: HttpClient) { }

    private baseUrl = "http://localhost:3000/tracks";

    public getAll(): Promise<RaceTrackComponent[]> {
        return this.http.get(this.baseUrl + "/all")
            .toPromise()
            .then(function (response) {
                const tracks:RaceTrackComponent[] = [];
                Object.keys(response).forEach(track => tracks.push(new RaceTrackComponent()));
                return tracks;
            })
            .catch(this.handleError);
    }

    public getTrack(id: string): Promise<RaceTrackComponent> {
        return this.http.get(this.baseUrl + "/" + id)
            .toPromise()
            .then(response => new RaceTrackComponent())
            .catch(this.handleError);
    }

    public addTrack(track: RaceTrackComponent): Promise<boolean> {
        return this.http.post(this.baseUrl + "/add", track)
            .toPromise()
            .then(response => response as boolean)
            .catch(this.handleError);
    }

    public updateTrack(id: string, track: Partial<RaceTrackComponent>): Promise<boolean> {
        if (id === undefined) {
            throw new Error("Impossible to update a track without an id. To add a new track, use addTrack()");
        }
        const update = { $set: track };
        return this.http.put(this.baseUrl + '/' + id, update)
            .toPromise()
            .then(response => response as boolean)
            .catch(this.handleError);
    }

    public deleteTrack(id: string): Promise<boolean> {
        if (id === undefined) {
            throw new Error("Impossible to delete a track without an id");
        }
        return this.http.delete(this.baseUrl + '/' + id)
            .toPromise()
            .then(response => response as boolean)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error); 
        return Promise.reject(error.message || error);
    }
}
