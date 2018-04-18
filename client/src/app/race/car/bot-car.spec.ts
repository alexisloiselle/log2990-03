import { BotCar } from "./bot-car";
import { RenderService } from "../../render-service/render.service";
import { Vector2 } from "three";

const MS_BETWEEN_FRAMES: number = 16.6667;

/* tslint:disable: no-magic-numbers */
describe("BotCar", () => {
    const botCar: BotCar = new BotCar();

    beforeEach(async (done: () => void) => {
        botCar.init(await RenderService.loadCar("../../assets/porsche/porsche.json"));
        botCar.isAcceleratorPressed = true;
        botCar.update(MS_BETWEEN_FRAMES * 2);
        done();
    });

    it("getPositive angle should return the right angle", () => {
        const vector1: Vector2 = new Vector2(2, 2);
        const vector2: Vector2 = new Vector2(-2, -2);
        expect(BotCar.getPositiveAngle(vector1)).toBe(0.7853981633974483);
        expect(BotCar.getPositiveAngle(vector2)).toBe(3.9269908169872414);
    });
});
