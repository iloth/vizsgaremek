import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/userModel";
import authService from "../services/AuthService"

export abstract class BaseController {
  constructor() {}

  protected getAccessToken(req: Request): string | null {
    const header = req.headers.authorization;
    if (header) {
      return header.split(' ')[1];
    } else {
      return null
    }
  }

  protected async getCurrentUser(req: Request): Promise<IUser | null> {
    const token = this.getAccessToken(req);
    if (token) {
      return await authService.checkAccessToken(token)
    } else {
      return null;
    }
  }

  
}