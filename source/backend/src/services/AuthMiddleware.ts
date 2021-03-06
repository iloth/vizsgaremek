import { Request, Response, NextFunction } from "express";
import authService from './AuthService';

class AuthMiddleware {
  constructor( ) { }

  private getAccessToken(req: Request): string | null {
    const header = req.headers.authorization;
    if (header) {
      return header.split(' ')[1];
    } else {
      return null
    }
  }

  async isLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    const accessToken = this.getAccessToken(req);
    if (accessToken) {
      const user = await authService.checkAccessToken(accessToken);
      if (user) {
        return next();
      }
    }
    res.sendStatus(403);
  }

  isMemberOf(roles: string | string[]): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      const accessToken = this.getAccessToken(req);

      if (accessToken) {
        const user = await authService.checkAccessToken(accessToken);
        
        if (user) {
          if (Array.isArray(roles)) {
            let found: boolean = false;
            roles.forEach((role) => {
              if (user.roles.includes(role)) {
                found = true;
              }
            });
            if (found) {
              return next();
            }
          } else {
            if (user.roles.includes(roles)) {
              return next();
            }
          }
        }
      }
      res.sendStatus(403);
    }
  }
}

export default new AuthMiddleware();