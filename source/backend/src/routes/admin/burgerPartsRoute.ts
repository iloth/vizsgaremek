import express, { NextFunction, Request, Response } from "express";
import HttpException from "../../utils/HttpException";
import { IBurgerPart } from "../../models/burgerPartModel";
import burgerPartService from '../../services/BurgerPartService';

const router = express.Router()

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parts = await burgerPartService.getAll();
    res.json(parts);
  } catch (error) {
    return next(new HttpException(500, 'Couldn\'t get list of parts', error))
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const part = req.body as IBurgerPart;
    const dbPart = await burgerPartService.create(part);
    res.json(dbPart);    
  } catch (error) {
    return next(new HttpException(500, 'Couldn\'t add part', error))
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const dbPart = await burgerPartService.get(id);
    res.json(dbPart);    
  } catch (error) {
    return next(new HttpException(500, 'Couldn get part', error))
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const part = req.body;
    const dbPart = await burgerPartService.update(id, part);
    res.json(dbPart);    
  } catch (error) {
    return next(new HttpException(500, 'Couldn update part', error))
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    await burgerPartService.remove(id);
    res.end();    
  } catch (error) {
    return next(new HttpException(500, 'Couldn delete part', error))
  }
});

export default router;