import { AuthMiddlewaresMap, BaseApiRouter } from "./BaseApiRouter";
import orderController from "../controllers/OrderController";
import { Request, Response, NextFunction } from "express";
import { IOrder } from "../models/orderModel";
import AuthMiddleware from "../services/AuthMiddleware";

class OrderRouter extends BaseApiRouter<IOrder> {
  constructor() {
    const security: AuthMiddlewaresMap = new Map();
    security.set('create', AuthMiddleware.isMemberOf('admin'));
    security.set('update', AuthMiddleware.isMemberOf('admin'));
    security.set('delete', AuthMiddleware.isMemberOf('admin'));

    super(orderController, security);
    
    this.router.post('/user/:id', (req: Request, res: Response, next: NextFunction) => { orderController.getByUserId(req, res, next); } )
  }
}

export default new OrderRouter();