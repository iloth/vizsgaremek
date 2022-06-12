import { IBurgerPart } from "../models/burgerPartModel";
import { BaseApiController } from "./BaseApiController";
import burgerPartService from '../services/BurgerPartService';

class BurgerPartController extends BaseApiController<IBurgerPart> {
  constructor() { 
    super(burgerPartService);
  }
}

export default new BurgerPartController();