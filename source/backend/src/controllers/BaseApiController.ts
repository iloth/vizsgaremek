import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import { BaseApiService } from "../services/BaseApiService";
import HttpException from "../utils/HttpException";
import { BaseController } from "./BaseController";

export abstract class BaseApiController<Model extends Document> extends BaseController {
  constructor(
    protected service: BaseApiService<Model>
  ) {
    super();
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const entities = await this.service.getAll();
      res.json(entities);
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get entities', error));
    }
  };

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const entity = req.body as Model;
      const dbEntity = await this.service.create(entity);
      res.json(dbEntity);    
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t add entity', error));
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const dbEntity = await this.service.get(id);
      res.json(dbEntity);
    } catch (error) {
      next(new HttpException(500, 'Couldn get entity', error));
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const entity = req.body;
      const dbEntity = await this.service.update(id, entity);
      res.json(dbEntity);    
    } catch (error) {
      next(new HttpException(500, 'Couldn update entity', error));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      await this.service.delete(id);
      res.end();    
    } catch (error) {
      next(new HttpException(500, 'Couldn delete entity', error));
    }
  }
}