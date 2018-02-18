import { } from "jasmine";
import { expect } from "chai";

import { MAX_DEFS, API_URL } from "../config";

describe("Lexicon", () => {
    // tslint:disable-next-line:typedef
    const chai = require("chai");
    // tslint:disable-next-line:typedef
    const chaiHttp = require("chai-http");
    chai.use(chaiHttp);

    describe("Constructor", () => {
        it("should be defined and contain words", async () => {
            // tslint:disable-next-line:no-any
            const req: any = await chai.request(API_URL).get("/lexicon");
            const words: string[] = req.body;
            expect(words).to.be.an("array");
            expect(words.length).not.to.be.equal(0);
        });
    });

    describe("getDefs", () => {
        it("should contain 2 or less defs, ('cat')", async () => {
            // tslint:disable-next-line:no-any
            const req: any = await chai.request(API_URL)
                .get("/lexicon/definition/cat");
            const definitions: string[] = req.body;
            expect(definitions.length).to.satisfy((l: number) => {
                return l >= 0 && l <= MAX_DEFS;
            });
        });
    });

    describe("get words from pattern", () => {
        it("should contain common words with pattern: 'h    '", async () => {
            // tslint:disable-next-line:no-any
            const req: any = await chai.request(API_URL).get("/lexicon/common/h%20%20%20%20");
            const wordsWithPattern: string[] = req.body;
            expect(wordsWithPattern).to.contain("house");
            expect(wordsWithPattern).to.contain("hairy");
        });

        it("should contain uncommon words with pattern: ' ert  '", async () => {
            // tslint:disable-next-line:no-any
            const req: any = await chai.request(API_URL).get("/lexicon/uncommon/%20ert%20%20");
            const wordsWithPattern: string[] = req.body;
            expect(wordsWithPattern).to.contain("bertha");
            expect(wordsWithPattern).to.contain("certes");
        });

        it("should contain 0 common words with pattern: 'ajsjddh'", async () => {
            // tslint:disable-next-line:no-any
            const req: any = await chai.request(API_URL).get("/lexicon/common/ajsjddh");
            const wordsWithPattern: string[] = req.body;
            expect(wordsWithPattern.length).to.be.equal(0);
        });
    });
});
