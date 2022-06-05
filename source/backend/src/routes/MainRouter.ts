import { BaseRouter } from "./BaseRouter";
import { NextFunction, Request, Response } from "express";

class MainRouter extends BaseRouter {
  constructor() {
    super();

    this.router.get('/', async (req:Request, res: Response, next: NextFunction): Promise<void> => {
      res.json({ info: "Not implemented yet", moreInfo: "Coming soon." });
    });
  }
}

export default new MainRouter();