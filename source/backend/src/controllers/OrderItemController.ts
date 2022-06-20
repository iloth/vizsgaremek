import { IOrderItem } from "../models/orderItemModel";
import { BaseApiController } from "./BaseApiController";
import orderItemService from '../services/OrderItemService';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";

class OrderItemController extends BaseApiController<IOrderItem> {
  constructor() { 
    super(orderItemService);
  }

  async getByOrderId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const entities = await orderItemService.getByOrderId(id);
      res.json(entities);
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get order items', error));
    }
  };
}

export default new OrderItemController();