import { IBurgerPart, burgerPartModel } from "../models/burgerPartModel";
import { BaseApiService } from "./BaseApiService";

class BurgerPartService extends BaseApiService<IBurgerPart> {
  constructor() {
    super(burgerPartModel);
  }
}

export default new BurgerPartService();