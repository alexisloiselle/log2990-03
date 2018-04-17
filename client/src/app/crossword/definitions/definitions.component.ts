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
}
