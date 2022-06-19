import { IUser } from "../../models/userModel";
import userController from "../../controllers/UserController";
import { BaseApiRouter } from "../BaseApiRouter";
import { Request, Response, NextFunction } from "express";

class UserRouter extends BaseApiRouter<IUser> {
  constructor() {
    super(userController);

    this.router.post('/:id/resetpassword', (req: Request, res: Response, next: NextFunction) => { userController.resetPassword(req, res, next); } )

  }
}

export default new UserRouter();