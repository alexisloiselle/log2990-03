export interface ICrosswordGame {
    gameInfo: ICrosswordGameInfo;
    letters: string[][];
    words: IWords[];
}

export interface ICrosswordGameInfo {
    userName1: string;
    userName2: string;
    gameName: string;
    difficulty: string;
}

export interface IWords {
    word: string;
    def: string;
    isHorizontal: boolean;
    position: IPosition;
}

export interface IPosition {
    x: number;
    y: number;
}
