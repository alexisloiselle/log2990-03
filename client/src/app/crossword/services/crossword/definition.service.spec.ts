import { TestBed, inject } from "@angular/core/testing";

import { DefinitionService } from "./definition.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CrosswordService } from "./crossword.service";

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
});
