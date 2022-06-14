import { UserModel } from "../admin/UserModel";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
  user: UserModel
}