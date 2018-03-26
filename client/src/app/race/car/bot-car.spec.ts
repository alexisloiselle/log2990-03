import { BotCar } from "./bot-car";
import { RenderService } from "../../render-service/render.service";

describe("BotCar", () => {
    const botCar: BotCar = new BotCar();

    beforeEach(async (done: () => void) => {
        botCar.init(await RenderService.loadCar("../../assets/porsche/porsche.json"));
        done();
    });

});
