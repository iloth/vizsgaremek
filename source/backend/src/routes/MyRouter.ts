import { BaseRouter } from "./BaseRouter";
import { Request, Response, NextFunction } from "express";
import myController from "../controllers/MyController";

class MyRouter extends BaseRouter {
  constructor() {
    super();

    this.router.get('/profile', (req: Request, res: Response, next: NextFunction) => { myController.profile(req, res, next); } )
    this.router.get('/orders', (req: Request, res: Response, next: NextFunction) => { myController.orders(req, res, next); } )
    this.router.get('/favourites', (req: Request, res: Response, next: NextFunction) => { myController.favourites(req, res, next); } )
  }
}

export default new MyRouter();