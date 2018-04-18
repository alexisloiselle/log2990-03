import { TestBed, inject } from "@angular/core/testing";

import { RaceAdministratorService } from "./race-administrator.service";

describe("RaceAdministratorService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RaceAdministratorService]
        });
    });

    it("should be created", inject([RaceAdministratorService], (service: RaceAdministratorService) => {
        expect(service).toBeTruthy();
    }));
});
// TODO FAIRE LES TESTS YO
