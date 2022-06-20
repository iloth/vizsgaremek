import { AuthMiddlewaresMap, BaseApiRouter } from "./BaseApiRouter";
import favouriteController from "../controllers/FavouriteController";
import { Request, Response, NextFunction } from "express";
import { IFavourite } from "../models/favouriteModel";
import AuthMiddleware from "../services/AuthMiddleware"

class FavouriteRouter extends BaseApiRouter<IFavourite> {
  constructor() {
    const security: AuthMiddlewaresMap = new Map();
    security.set('create', AuthMiddleware.isMemberOf('admin'));
    security.set('update', AuthMiddleware.isMemberOf('admin'));
    security.set('delete', AuthMiddleware.isMemberOf('admin'));

    super(favouriteController, security);
    
    this.router.get('/user/:id', (req: Request, res: Response, next: NextFunction) => { favouriteController.getByUserId(req, res, next); })
  }

}

export default new FavouriteRouter();