import { IBurgerPart, burgerPartModel } from "../models/burgerPartModel";
import { BaseService } from "./BaseService";

class BurgerPartService extends BaseService<IBurgerPart> {
  constructor() {
    super(burgerPartModel);
  }
}

export default new BurgerPartService();