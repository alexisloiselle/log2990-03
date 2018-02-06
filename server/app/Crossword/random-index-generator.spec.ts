import {} from "jasmine";
import { expect } from "chai";

import { RandomIndexGenerator } from "./random-index-generator";

describe("RandomIndexGenerator", () => {
    const MINIMUM: number = 2;
    const MAXIMUM: number = 15;
    const randomIndexGenerator: RandomIndexGenerator = new RandomIndexGenerator(MINIMUM, MAXIMUM);

    describe("Generate Random Index", () => {
        const arraySize: number = 13;
        for (let i: number = 0; i <= arraySize; i++) {
            const index: number = randomIndexGenerator.generateRandomIndex();
            it ("Should return a number between the boundaries", () => {
                expect(index).to.be.below(MAXIMUM + 1);
                expect(index).to.be.greaterThan(MINIMUM - 1);
            });
        }
    });
});
