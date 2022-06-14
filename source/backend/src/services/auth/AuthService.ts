import jwt from 'jsonwebtoken';
import config from 'config'
import userService from '../UserService';
import { ILoginResult, IRefreshTokenResult } from '../../models/authentication';
import { IUser } from '../../models/userModel';

class AuthService {
  constructor() {}

  static refreshTokens: Map<string, string> = new Map();

  async login(email: string, password: string): Promise<ILoginResult | null> {
    const user = await userService.checkPassword(email, password);

    if (user) {
      user.password = "";

      const accessToken = jwt.sign(user, config.get('auth.accessTokenKey'), { expiresIn: config.get('auth.tokenExpire') });
      const refreshToken = jwt.sign(user, config.get('auth.refreshTokenKey'));
      
      AuthService.refreshTokens.set(user._id, refreshToken);

      return { accessToken, refreshToken, user } as ILoginResult;
    }

    return null;
  }

  async logout(accessToken: string): Promise<boolean> {
    const user: IUser = jwt.verify(accessToken, config.get('auth.accessTokenKey')) as any as IUser;

    if (user && AuthService.refreshTokens.has(user._id)) {
      AuthService.refreshTokens.delete(user._id);
      return true;
    }

    return false;
  }

  async refreshAccessToken(refreshToken: string):  Promise<IRefreshTokenResult | null> {
    if (!refreshToken) {
      return null;
    }

    const user: IUser = jwt.verify(refreshToken, config.get('auth.refreshTokenKey')) as any as IUser;
    if (!user) {
      return null;
    }

    const accessToken = jwt.sign(user, config.get('auth.accessTokenKey'), { expiresIn: config.get('auth.tokenExpire') });

    return { accessToken } as IRefreshTokenResult;
  }

  //non client functions:

  async checkAccessToken(accessToken: string): Promise<IUser | null> {
    const user: IUser = jwt.verify(accessToken, config.get('auth.accessTokenKey')) as any as IUser;
    return user;
/*     if (user && AuthService.refreshTokens.has(user._id)) {
      return user;
    } else {
      return null;
    }
 */  
  }

}

export default new AuthService();