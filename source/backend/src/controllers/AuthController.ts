import { Request, Response, NextFunction } from "express";
import authService from "../services/AuthService";
import HttpException from "../utils/HttpException";
import { BaseController } from "./BaseController";

class AuthController extends BaseController {
  constructor() { 
    super();
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      if (user) {
        res.json(user);
      } else {
        next(new HttpException(401, 'Bad email or wrong password'));
      }
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t login', error));
    }
  };

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { accessToken } = req.body;
      res.json(await authService.logout(accessToken));
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t logout', error));
    }
  };

  async refreshAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const token = await authService.refreshAccessToken(refreshToken);
      if (token) {
        res.json(token);
      } else {
        next(new HttpException(403, 'Invalid token'));
      }
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t refresh token', error));
    }
  };
}

export default new AuthController();