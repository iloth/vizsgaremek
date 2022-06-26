import { Request, Response, NextFunction } from "express";
import DashboardController from "../controllers/DashboardController";
import { BaseRouter } from "./BaseRouter";

class DashboardRouter extends BaseRouter {
  constructor() {
    super();

    this.router.get('/orders/new', (req: Request, res: Response, next: NextFunction) => { DashboardController.getNewOrders(req, res, next); });
    this.router.get('/orders/inprogress', (req: Request, res: Response, next: NextFunction) => { DashboardController.getInProgressOrders(req, res, next); });
    this.router.get('/orders/stat', (req: Request, res: Response, next: NextFunction) => { DashboardController.getOrderStats(req, res, next); });
    this.router.get('/orders/historyw', (req: Request, res: Response, next: NextFunction) => { DashboardController.getOrderHistoryWeek(req, res, next); });
    this.router.get('/orders/historym', (req: Request, res: Response, next: NextFunction) => { DashboardController.getOrderHistoryMonth(req, res, next); });
  }  
}

export default new DashboardRouter();