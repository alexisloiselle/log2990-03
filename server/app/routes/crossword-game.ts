export interface ICrosswordGame {
    gameInfo: ICrosswordGameInfo;
    letters: string[][];
    words: IWord[];
}

export interface ICrosswordGameInfo {
    userName1: string;
    userName2: string;
    gameName: string;
    difficulty: string;
}

export interface IWord {
    word: string;
    definition: string;
    isHorizontal: boolean;
    position: IPosition;
}

export interface IPosition {
    x: number;
    y: number;
}
