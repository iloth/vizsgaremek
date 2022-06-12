import { Request, Response, NextFunction } from "express";
import authService from './AuthService';

class AuthMiddleware {
  constructor( ) { }

  async isLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { accessToken } = req.body;
    if (accessToken) {
      const user = await authService.checkAccessToken(accessToken);
      if (user) {
        return next();
      }
    }
    res.sendStatus(403);
  }

  isMemberOf(role: string): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { accessToken } = req.body;
      if (accessToken) {
        const user = await authService.checkAccessToken(accessToken);
        if (user && user.roles.includes(role)) {
          return next();
        }
      }
      res.sendStatus(403);
    }
  }



}
export default new AuthMiddleware();