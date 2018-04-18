import { TestBed, inject } from "@angular/core/testing";

import { DefinitionService } from "./definition.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CrosswordService } from "./crossword.service";
import {Word} from "../../word";

describe("DefinitionService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DefinitionService,
                CrosswordService,
            ]
        });
    });

    it("should be created", inject([DefinitionService], (service: DefinitionService) => {
        expect(service).toBeTruthy();
    }));

    it("should attribut the selected word", inject([DefinitionService], (service: DefinitionService) => {
        const word: Word = new Word("mot", "leMot", false, 0, 0);
        service.handleClickDef(word);
        expect(service.SelectedWord === word).toBeTruthy();
    }));
});
