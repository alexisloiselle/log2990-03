import {} from "jasmine";
import { expect } from "chai";

import { RandomIndexGenerator } from "./random-index-generator";

describe("RandomIndexGenerator", () => {
    const minimum: number = 2;
    const maximum: number = 15;
    const randomIndexGenerator: RandomIndexGenerator = new RandomIndexGenerator(minimum, maximum);

    describe("Generate Random Index", () => {
        const arraySize: number = 13;
        for (let i: number = 0; i <= arraySize; i++) {
            const index: number = randomIndexGenerator.generateRandomIndex();
            it ("Should return a number between the boundaries", () => {
                expect(index).to.be.below(maximum + 1);
                expect(index).to.be.greaterThan(minimum - 1);
            });
        }
    });
});
