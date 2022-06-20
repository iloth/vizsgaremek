import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";
import { BaseController } from "./BaseController";
import userService from "../services/UserService";
import orderService from "../services/OrderService";
import favouriteService from "../services/FavouriteService";

class MyController extends BaseController {
  constructor() { 
    super();
  }

  async profile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.getCurrentUser(req);
      if (user) {
        const dbEntity = await userService.get(user.id);
        res.json(dbEntity);
      } else {
        next(new HttpException(403, 'Couldn\'t get current user'));
      }
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get profile', error));
    }
  }

  async orders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.getCurrentUser(req);
      if (user) {
        const dbEntities = await orderService.getByUserId(user.id);
        res.json(dbEntities);
      } else {
        next(new HttpException(403, 'Couldn\'t get current user'));
      }
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get orders', error));
    }
  }

  async favourites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.getCurrentUser(req);
      if (user) {
        const dbEntities = await favouriteService.getByUserId(user.id);
        res.json(dbEntities);
      } else {
        next(new HttpException(403, 'Couldn\'t get current user'));
      }
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get favourites', error));
    }
  }
}

export default new MyController();