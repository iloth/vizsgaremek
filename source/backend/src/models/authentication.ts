import { IUser } from "./userModel";

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IRefreshTokenResult {
  accessToken: string;
}
