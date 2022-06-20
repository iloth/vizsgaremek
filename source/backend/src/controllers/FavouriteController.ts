import { IFavourite } from "../models/favouriteModel";
import { BaseApiController } from "./BaseApiController";
import favouriteService from '../services/FavouriteService';
import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";
import mongoose from "mongoose";

class FavouriteController extends BaseApiController<IFavourite> {
  constructor() { 
    super(favouriteService);
  }

  async getByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let id: string | null = req.params.id;
      if (!mongoose.isValidObjectId(id)) {
        id = null;
      }
      const entities = await favouriteService.getByUserId(id);
      res.json(entities);
    } catch (error) {
      next(new HttpException(500, 'Couldn\'t get favourites', error));
    }
  };
}

export default new FavouriteController();