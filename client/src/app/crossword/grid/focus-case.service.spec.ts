import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FocusCaseService } from "./focus-case.service";
import { DefinitionService } from "../services/crossword/definition.service";
import { CrosswordService } from "../services/crossword/crossword.service";
import { } from "jasmine";

describe("FocusCaseService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FocusCaseService, DefinitionService, CrosswordService]
        });
    });

    it("should be created", inject([FocusCaseService], (service: FocusCaseService) => {
        expect(service).toBeTruthy();
    }));
});
