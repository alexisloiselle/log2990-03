import { TestBed } from "@angular/core/testing"; // inject

import { RenderService } from "./render.service";

describe("RenderService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RenderService]
        });
    });

    // it("should be created", inject([RenderService], (service: RenderService) => {
    //     expect(service).toBeTruthy();
    // }));
});
