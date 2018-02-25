export interface FormattedGrid {
    letters: string[][];
    words: {
        word: string,
        def: string,
        isHorizontal: boolean,
        position: {x: number, y: number}
    }[];
}
