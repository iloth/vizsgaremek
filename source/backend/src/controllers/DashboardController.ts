import { Request, Response, NextFunction } from "express";
import { IOrderHistoryMonth, IOrderHistoryWeek, IOrders, IOrderStat } from "../models/dashboard";
import orderService from "../services/OrderService";
import HttpException from "../utils/HttpException";
import { BaseController } from "./BaseController";

class DashboardController extends BaseController {
  constructor() { 
    super();
  }

  async getNewOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await orderService.getOrdered();
      res.json(orders);
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get new orders', error));
    }
  }

  async getInProgressOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await orderService.getInprogress();
      res.json(orders);
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get inprogress orders', error));
    }
  }

  async getOrderStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stat = await orderService.getOrderStat();
      res.json(stat)
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get order stats', error));
    }
  }

  async getOrderHistoryWeek(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hist = await orderService.getOrderHistoryW();
      res.json(hist);
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get order history', error));
    }
  }

  async getOrderHistoryMonth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hist = await orderService.getOrderHistoryM();
      res.json(hist);
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get order history', error));
    }
  }

}

export default new DashboardController();