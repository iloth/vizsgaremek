import { BaseRouter } from "./BaseRouter";
import authController from "../controllers/AuthController";
import { Request, Response, NextFunction } from "express";

class AuthRouter extends BaseRouter {
  constructor() {
    super();

    this.router.post('/login', (req: Request, res: Response, next: NextFunction) => { authController.login(req, res, next); } )
    this.router.post('/logout', (req: Request, res: Response, next: NextFunction) => { authController.logout(req, res, next); } )
    this.router.post('/refresh', (req: Request, res: Response, next: NextFunction) => { authController.refreshAccessToken(req, res, next); } )
  }
}

export default new AuthRouter();