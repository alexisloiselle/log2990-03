import { Component, OnInit } from "@angular/core";
import { DefinitionService } from "../services/crossword/definition.service";
import { Word } from "../word";

@Component({
    selector: "app-definitions",
    templateUrl: "./definitions.component.html",
    styleUrls: ["./definitions.component.css"]
})
export class DefinitionsComponent implements OnInit {
    public opponentSelectedWord: Word;
    public opponentFoundWords: Array<Word> = [];

    public constructor(
        protected defService: DefinitionService
    ) { }

    public ngOnInit(): void {
    }

    public get OpponentSelectedWord(): Word {
        return this.opponentSelectedWord;
    }

    public set OpponentSelectedWord(word: Word) {
        this.opponentSelectedWord = word;
    }

    public addOpponentFoundWord(word: Word): void {
        this.opponentFoundWords.push(word);
    }

    public isWordFoundByOpponent(word: Word): boolean {
        for (const opponentFoundWord of this.opponentFoundWords) {
            if (word.Word === opponentFoundWord.Word) {
                return true;
            }
        }

        return false;
    }
}
