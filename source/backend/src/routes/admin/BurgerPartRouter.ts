import { IBurgerPart } from "../../models/burgerPartModel";
import burgerPartController from "../../controllers/BurgerPartController";
import { BaseApiRouter } from "../BaseApiRouter";

class BurgerPartRouter extends BaseApiRouter<IBurgerPart> {
  constructor() {
    super(burgerPartController);
  }
}

export default new BurgerPartRouter();