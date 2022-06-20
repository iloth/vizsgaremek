import { IUser } from "../models/userModel";
import userController from "../controllers/UserController";
import favouriteController from "../controllers/FavouriteController";
import { BaseApiRouter } from "./BaseApiRouter";
import { Request, Response, NextFunction } from "express";

class UserRouter extends BaseApiRouter<IUser> {
  constructor() {
    super(userController);

    this.router.post('/:id/resetpassword', (req: Request, res: Response, next: NextFunction) => { userController.resetPassword(req, res, next); } )
    this.router.get('/:id/favourites', (req: Request, res: Response, next: NextFunction) => { favouriteController.getByUserId(req, res, next); } )

  }
}

export default new UserRouter();