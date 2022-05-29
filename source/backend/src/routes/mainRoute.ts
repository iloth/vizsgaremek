import express, { NextFunction, Request, Response } from "express";

const router = express.Router()

router.get('/', async (req:Request, res: Response, next: NextFunction): Promise<void> => {
  res.json({ "info": "Not jet implemented" });
});

export default router;