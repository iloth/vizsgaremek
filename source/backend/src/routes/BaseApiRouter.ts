import { Document } from "mongoose";
import { BaseRouter } from "./BaseRouter";
import { BaseController } from "../controllers/BaseController";
import { Request, Response, NextFunction } from "express";

export abstract class BaseApiRouter<Model extends Document> extends BaseRouter {
  constructor(
    private controller: BaseController<Model>
  ) {
    super();

    this.router.get('/', (req: Request, res: Response, next: NextFunction) => { controller.getAll(req, res, next); });
    
    this.router.post('/', (req: Request, res: Response, next: NextFunction) => { controller.create(req, res, next); });
    
    this.router.get('/:id', (req: Request, res: Response, next: NextFunction) => { controller.get(req, res, next); });
    
    this.router.put('/:id', (req: Request, res: Response, next: NextFunction) => { controller.update(req, res, next); });
    
    this.router.delete('/:id', (req: Request, res: Response, next: NextFunction) => { controller.delete(req, res, next); });
  }
} 