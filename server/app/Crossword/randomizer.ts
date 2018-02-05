export class Randomizer {
    public generateRandomNumber(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * maximum) + minimum;
    }
}