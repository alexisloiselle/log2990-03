import { BotCar } from "./bot-car";
import { RenderService } from "../../render-service/render.service";
import { Vector2, LineCurve } from "three";

describe("BotCar", () => {
    const botCar: BotCar = new BotCar();

    beforeEach(async (done: () => void) => {
        botCar.init(await RenderService.loadCar("../../assets/porsche/porsche.json"));
        done();
    });

    it("should ajust in the right direction", () => {
        const startVector: Vector2 = new Vector2(0, 0);
        const endVector: Vector2 = new Vector2(botCar.direction.x, botCar.direction.y);
        // tslint:disable-next-line:no-magic-numbers
        expect(endVector.length()).toBe(3);
        const angle: number = -0.7;
        endVector.rotateAround(new Vector2(0, 0), angle);
        const segment: LineCurve = new LineCurve(startVector, endVector);
        expect(botCar.ajustDirection(segment)).toBe("right");
    });

});
