import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RaceTrack } from "./race/raceTrack";
import { InvalidArgumentError } from "./race/invalidArgumentError";
import { API_URL } from "./config";

@Injectable()
export class TrackService {

    public constructor(private http: HttpClient) { }

    private readonly BASE_URL: string = `${API_URL}/tracks`;

    public async getTracks(): Promise<RaceTrack[]> {
        return this.http.get(`${this.BASE_URL}/all`)
            .toPromise()
            .then((response: { _id: string, track: string }[]) => {
                const tracks: RaceTrack[] = [];
                for (let i: number = 0; i < response.length; i++) {
                    tracks.push(JSON.parse(response[i].track));
                    tracks[i].id = response[i]._id;
                }

                return tracks;
            })
            .catch((error: Error) => this.handleError<RaceTrack[]>(error));
    }

    public async getTrack(id: string): Promise<RaceTrack> {
        return this.http.get(`${this.BASE_URL}/${id}`)
            .toPromise()
            .then((response: RaceTrack) => response)
            .catch((error: Error) => this.handleError<RaceTrack>(error));
    }

    public async addTrack(track: RaceTrack): Promise<boolean> {
        const body: { track: string } = { track: JSON.stringify(track) };

        return this.http.post(`${this.BASE_URL}/add`, body)
            .toPromise()
            .then((response: boolean) => response)
            .catch((error: Error) => this.handleError<boolean>(error));
    }

    public async updateTrack(track: RaceTrack): Promise<boolean> {
        if (track.id === undefined) {
            throw new InvalidArgumentError("Impossible to update a track without an id.");
        }
        const update: {$set: string} = { $set: JSON.stringify(track) };

        return this.http.put(`${this.BASE_URL}/${track.id}`, update)
            .toPromise()
            .then((response: boolean) => response)
            .catch((error: Error) => this.handleError<boolean>(error));
    }

    public async deleteTrack(id: string): Promise<boolean> {
        if (id === undefined) {
            throw new InvalidArgumentError("Impossible to delete a track without a id");
        }

        return this.http.delete(`${this.BASE_URL}/${id}`)
            .toPromise()
            .then((response: boolean) => response)
            .catch((error: Error) => this.handleError<boolean>(error));
    }

    private async handleError<T>(error: Error): Promise<T> {
        return Promise.reject(error.message);
    }
}
