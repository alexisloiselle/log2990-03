import { Word } from "./word";

export class WordSorter {
    private partition(array: Word[], left: number, right: number): number { 
        const pivot: number = array[right].getLength(); 
        let index: number = left - 1; 
 
        for (let i: number = left; i < right - 1; i++) { 
            if (array[i].getLength() <= pivot) { 
                index++; 
                const firstTemp: Word = array[index]; 
                array[index] = array[i]; 
                array[i] = firstTemp; 
            } 
        } 
 
        const secondTemp: Word = array[index + 1]; 
        array[index + 1] = array[right]; 
        array[right] = secondTemp; 
 
        return index; 
    } 
 
    public sortArray(array: Word[], firstIndex: number, lastIndex: number): void { 
        if ( firstIndex < lastIndex) { 
            const partitionIndex: number = this.partition(array, firstIndex, lastIndex); 
 
            this.sortArray(array, firstIndex, partitionIndex - 1); 
            this.sortArray(array, partitionIndex + 1, lastIndex); 
        } 
    } 
}