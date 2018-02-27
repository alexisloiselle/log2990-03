import { } from "jasmine";

import { expect } from "chai";
import { Word, Direction } from "./word";
import { DefinitionAdder } from "./definition-adder";
import { Difficulty } from "../../../common/difficulty";

describe("definition-adder", () => {
    it("should add definitions in the word list", async () => {
        const words: Word[] = [];
        const wordLength: number = 3;
        words.push(new Word(0, 0, wordLength, Direction.Horizontal, "bee"));
        words.push(new Word(0, 0, wordLength, Direction.Vertical, "ace"));
        await DefinitionAdder.addDefinitions(words, Difficulty.Easy);
        expect(words[0].Definition).to.be.equal("any of numerous hairy-bodied insects including social and solitary species");
        expect(words[1].Definition).to.be.equal("a serve that the receiver is unable to reach");
    });
});
