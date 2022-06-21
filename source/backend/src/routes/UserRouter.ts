import { IUser } from "../models/userModel";
import userController from "../controllers/UserController";
import favouriteController from "../controllers/FavouriteController";
import { AuthMiddlewaresMap, BaseApiRouter } from "./BaseApiRouter";
import { Request, Response, NextFunction } from "express";
import AuthMiddleware from "../services/AuthMiddleware";

class UserRouter extends BaseApiRouter<IUser> {
  constructor() {
    const security: AuthMiddlewaresMap = new Map();
    security.set('create', AuthMiddleware.isMemberOf('admin'));
    security.set('update', AuthMiddleware.isMemberOf('admin'));
    security.set('delete', AuthMiddleware.isMemberOf('admin'));

    super(userController, security);

    this.router.post('/:id/resetpassword', AuthMiddleware.isMemberOf('admin'), (req: Request, res: Response, next: NextFunction) => { userController.resetPassword(req, res, next); } )
    this.router.get('/:id/favourites', (req: Request, res: Response, next: NextFunction) => { favouriteController.getByUserId(req, res, next); } )
  }
}

export default new UserRouter();