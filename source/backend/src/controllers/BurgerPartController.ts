import { IBurgerPart } from "../models/burgerPartModel";
import { BaseController } from "./BaseController";
import burgerPartService from '../services/BurgerPartService';

class BurgerPartController extends BaseController<IBurgerPart> {
  constructor() { 
    super(burgerPartService);
  }
}

export default new BurgerPartController();