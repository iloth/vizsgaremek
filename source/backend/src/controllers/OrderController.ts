import { IOrder } from "../models/orderModel";
import { BaseApiController } from "./BaseApiController";
import orderService from '../services/orderService';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";

class OrderController extends BaseApiController<IOrder> {
  constructor() { 
    super(orderService);
  }

  async getByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const entities = await orderService.getByUserId(id);
      res.json(entities);
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get orders', error));
    }
  };
}

export default new OrderController();