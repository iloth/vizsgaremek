import { Document } from "mongoose";
import { BaseRouter } from "./BaseRouter";
import { BaseApiController } from "../controllers/BaseApiController";
import { Request, Response, NextFunction } from "express";

export type RouterFunction = (req: Request, res: Response, next: NextFunction) => void;
export type AuthMiddlewaresMap = Map<'getAll' | 'get' | 'create' | 'update' | 'delete', RouterFunction>; 
export abstract class BaseApiRouter<Model extends Document> extends BaseRouter {
  constructor(
    private controller: BaseApiController<Model>,
    private authMiddlewares: AuthMiddlewaresMap = new Map()
  ) {
    super();

    if (authMiddlewares.has('getAll')) {
      this.router.get('/', authMiddlewares.get('getAll') as RouterFunction, (req: Request, res: Response, next: NextFunction) => { controller.getAll(req, res, next); });
    } else {
      this.router.get('/', (req: Request, res: Response, next: NextFunction) => { controller.getAll(req, res, next); });
    }
    
    if (authMiddlewares.has('create')) {
      this.router.post('/', authMiddlewares.get('create') as RouterFunction, (req: Request, res: Response, next: NextFunction) => { controller.create(req, res, next); });
    } else {
      this.router.post('/', (req: Request, res: Response, next: NextFunction) => { controller.create(req, res, next); });
    }

    if (authMiddlewares.has('get')) {
      this.router.get('/:id', authMiddlewares.get('get') as RouterFunction, (req: Request, res: Response, next: NextFunction) => { controller.get(req, res, next); });
    } else {
      this.router.get('/:id', (req: Request, res: Response, next: NextFunction) => { controller.get(req, res, next); });
    }

    if (authMiddlewares.has('update')) {
      this.router.put('/:id', authMiddlewares.get('update') as RouterFunction, (req: Request, res: Response, next: NextFunction) => { controller.update(req, res, next); });
    } else {
      this.router.put('/:id', (req: Request, res: Response, next: NextFunction) => { controller.update(req, res, next); });
    }

    if (authMiddlewares.has('delete')) {
      this.router.delete('/:id', authMiddlewares.get('delete') as RouterFunction, (req: Request, res: Response, next: NextFunction) => { controller.delete(req, res, next); });
    } else {
      this.router.delete('/:id', (req: Request, res: Response, next: NextFunction) => { controller.delete(req, res, next); });
    }

  }
} 