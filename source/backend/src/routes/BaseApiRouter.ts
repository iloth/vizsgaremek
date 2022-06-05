import { Document } from "mongoose";
import { BaseService } from "../services/BaseService";
import express, { Request, Response, NextFunction, Router } from 'express'
import HttpException from "../utils/HttpException";

export abstract class BaseApiRouter<Model extends Document> {
  constructor(
    private service: BaseService<Model>
  ) {
    
    this.router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const entities = await service.getAll();
        res.json(entities);
      } catch (error) {
        return next(new HttpException(500, 'entities\'t get entities', error));
      }
    });
    
    this.router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const entity = req.body as Model;
        const dbEntity = await service.create(entity);
        res.json(dbEntity);    
      } catch (error) {
        console.log(error);
        return next(new HttpException(500, 'Couldn\'t add entity', error));
      }
    });
    
    this.router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const id = req.params.id;
        const dbEntity = await service.get(id);
        res.json(dbEntity);
      } catch (error) {
        return next(new HttpException(500, 'Couldn get entity', error));
      }
    });
    
    this.router.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const id = req.params.id;
        const entity = req.body;
        const dbEntity = await service.update(id, entity);
        res.json(dbEntity);    
      } catch (error) {
        return next(new HttpException(500, 'Couldn update entity', error));
      }
    });
    
    this.router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const id = req.params.id;
        await service.remove(id);
        res.end();    
      } catch (error) {
        return next(new HttpException(500, 'Couldn delete entity', error));
      }
    });
  }

  router: Router = express.Router();

} 