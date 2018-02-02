import {} from "jasmine";
import { expect } from "chai";

import { Lexicon } from "./lexicon";

describe("Lexicon", () => {

    let lexicon: Lexicon;

    beforeEach(() => {
        const testFile = "app/englishWordsTest.txt";
        lexicon = new Lexicon(testFile);
    });

    describe("Constructor", () => {
        it("should exist and have words", () => {
            expect(lexicon.allWords);
        });
        it("should contain 7 words", () => {
            expect(lexicon.allWords.length).to.be.equal(7);
        });
    });

    describe("getWordsByLength, length = 5", () => {
        it("should find 4 words of length = 5", () => {
            const wordsFiveLong: string[] = lexicon.getWordsByLength(5);
            expect(wordsFiveLong.length).to.be.equal(4);
        });
        it("should only find words of length = 5", () => {
            const wordsFiveLong: string[] = lexicon.getWordsByLength(5);
            wordsFiveLong.forEach((word: string) => {
                expect(word.length).to.be.equal(5);
            });
        });
    });

    describe("getWordsByLength, length = 2", () => {
        it("should not find words", () => {
            const wordsTwoLong: string[] = lexicon.getWordsByLength(2);
            expect(wordsTwoLong.length).to.be.equal(0);
        });
    });

    describe("getDefs", () => {
        it("should contain 2 or less defs, ('cat')", (done: Function) => {
            Lexicon.getDefinitions("cat").then((defs: string[]) => {
                expect(defs.length).to.be.below(3);
                expect(defs[0].includes("carnivorous")).to.be.true;
                expect(defs[0].includes("dog")).to.be.false;
                done();
            });
        });
    });

    describe("getFrequency", () => {
        it("table should have 41 frequencies", (done: Function) => {
            Lexicon.getFrequency("table").then((res: number) => {
                expect(res).to.be.equal(41);
                done();
            });
        });
    });

    describe("isUncommun", () => {
        it ("Word should be common", function(done) {
            const uncommon: boolean = Lexicon.isUncommon("table");
            expect(uncommon).to.be.equal(false);
            done();
         });
    });

    describe("isUncommun", () => {
        it ("Word should be uncommon", function(done) {
            const uncommon: boolean = Lexicon.isUncommon("alcazar");
            expect(uncommon).to.be.equal(false);
            done();
         });
    });
                
     describe("get words from pattern", () => {
        it("should contain 2 words (house and hello) with pattern: 'h    '", () => {
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern('h    ');
            expect(wordsWithPattern.length).to.be.equal(2);
            expect(wordsWithPattern).to.contain('hello');
            expect(wordsWithPattern).to.contain('house');
        });
        it("should contain 2 words (lavage and garage) with pattern: ' a age'", () => {
            const wordsWithPattern: string[] = lexicon.getWordsFromPattern(' a age');
            expect(wordsWithPattern.length).to.be.equal(2);
            expect(wordsWithPattern).to.contain('garage');
            expect(wordsWithPattern).to.contain('lavage');
        });
     });
    
});
