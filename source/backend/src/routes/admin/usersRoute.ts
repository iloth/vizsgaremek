import express, { NextFunction, Request, Response } from "express";
import { IUser } from "../../models/userModel";
import * as userService from '../../services/userService';
import HttpException from "../../utils/HttpException";

const router = express.Router()

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    return next(new HttpException(500, 'Couldn\'t get users'))
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.body as IUser;
    const dbUser = await userService.create(user);
    res.json(dbUser);    
  } catch (error) {
    return next(new HttpException(500, 'Couldn\'t add user'))
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const dbUser = await userService.get(id);
    res.json(dbUser);    
  } catch (error) {
    return next(new HttpException(500, 'Couldn get user'))
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const user = req.body;
    const dbUser = await userService.update(id, user);
    res.json(dbUser);    
  } catch (error) {
    return next(new HttpException(500, 'Couldn update user'))
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    await userService.remove(id);
    res.end();    
  } catch (error) {
    return next(new HttpException(500, 'Couldn update user'))
  }
});

export default router;