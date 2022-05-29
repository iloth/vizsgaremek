import express, { NextFunction, Request, Response } from "express";
import { IUser } from "../../models/userModel";
import * as userService from '../../services/userService';

const router = express.Router()

router.get('/', async (req:Request, res: Response, next: NextFunction): Promise<void> => {
  res.json(await userService.getAll());
});

router.post('/', async (req:Request, res: Response, next: NextFunction): Promise<void> => {
  const user = req.body as IUser;
  const dbUser = await userService.create(user);
  res.json(dbUser);
});

export default router;