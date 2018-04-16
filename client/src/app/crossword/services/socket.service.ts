import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";
import { SERVER_URL } from "../../config";
import { JOIN_GAME_EVENT, NEW_GAME_EVENT, GAME_BEGIN_EVENT, WORD_CORRECT, SELECTED_WORD } from "../../../../../common/socket-constants";
import { Word } from "../word";
import { IWord } from "../../../../../common/IWord";

@Injectable()
export class SocketService {

    private socket: SocketIOClient.Socket;

    public constructor() { }

    public connect(): void {
        this.socket = io(SERVER_URL);
    }

    public joinGame(gameName: string): void {
        this.socket.emit(JOIN_GAME_EVENT, gameName);
    }

    public newGame(gameName: string, playerName: string): void {
        this.socket.emit(NEW_GAME_EVENT, gameName, playerName);
    }

    public gameBegin(): Observable<boolean> {
        return new Observable((observer) => {
            this.socket.on(GAME_BEGIN_EVENT, (data: boolean) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
    }

    public wordCorrect(): Observable<{word: IWord, isHost: boolean}> {
        return new Observable((observer) => {
            this.socket.on(WORD_CORRECT, (res: {word: IWord, isHost: boolean}) => {
                observer.next({word: res.word, isHost: res.isHost});
            });
        });
    }

    public selectWord(): Observable<{word: IWord, isHost: boolean}> {
        return new Observable((observer) => {
            this.socket.on(SELECTED_WORD, (res: {word: IWord, isHost: boolean}) => {
                console.log("listened");
                observer.next({word: res.word, isHost: res.isHost});
            });
        });
    }

    public emitWordSelected(signal: string, word: Word): void {
        console.log("emit");
        this.socket.emit(signal, word);
    }

    public emitWordFound(signal: string, word: Word): void {
        this.socket.emit(signal, word);
    }
}
