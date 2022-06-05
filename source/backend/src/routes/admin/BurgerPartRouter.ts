import { IBurgerPart } from "../../models/burgerPartModel";
import burgerPartService from "../../services/burgerPartService";
import { BaseApiRouter } from "../BaseApiRouter";

class BurgerPartRouter extends BaseApiRouter<IBurgerPart> {
  constructor() {
    super(burgerPartService);
  }
}

export default new BurgerPartRouter();