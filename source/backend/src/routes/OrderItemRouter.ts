import { AuthMiddlewaresMap, BaseApiRouter } from "./BaseApiRouter";
import orderItemController from "../controllers/OrderItemController";
import { Request, Response, NextFunction } from "express";
import { IOrderItem } from "../models/orderItemModel";
import AuthMiddleware from "../services/AuthMiddleware";

class OrderItemRouter extends BaseApiRouter<IOrderItem> {
  constructor() {
    const security: AuthMiddlewaresMap = new Map();
    security.set('create', AuthMiddleware.isMemberOf('admin'));
    security.set('update', AuthMiddleware.isMemberOf('admin'));
    security.set('delete', AuthMiddleware.isMemberOf('admin'));

    super(orderItemController, security);
    
    this.router.get('/order/:id', (req: Request, res: Response, next: NextFunction) => { orderItemController.getByOrderId(req, res, next); } )
  }
}

export default new OrderItemRouter();