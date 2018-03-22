export interface IFormattedGrid {
    letters: string[][];
    words: IWord[];
}

export interface IWord {
    word: string;
    definition: string;
    isHorizontal: boolean;
    position: IPoint;
}

export interface IPoint {
    x: number;
    y: number;
}
