import { IUser } from "../models/userModel";
import { BaseApiController } from "./BaseApiController";
import userService from '../services/UserService';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";

class UserController extends BaseApiController<IUser> {
  constructor() { 
    super(userService);
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const { password } = req.body;

      await userService.resetPassword(id, password);
      res.end();
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t reset password', error));
    }
  };
}

export default new UserController();