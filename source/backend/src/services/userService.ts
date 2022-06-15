import { IUser, userModel } from "../models/userModel";
import { BaseApiService } from "./BaseApiService";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

class UserService extends BaseApiService<IUser> {
  constructor() {
    super(userModel);
  }

  //#region override gets to remove passwords

  override async getAll(): Promise<IUser[]> {
    return (await super.getAll()).map(userModel => {
      const user = userModel.toObject();
      delete user.password;
      return user as any as IUser;
    });
  }

  override async get(id: string): Promise<IUser | null> {
    const user = await super.get(id) as any;
    if(user) {
      delete user.password;
    }
    return user as IUser;
  }

  //#endregion

  private comparePassword(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  private hashPassword(plainPassword: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainPassword, salt);
  }

  async checkPassword(email: string, password: string): Promise<IUser | null> {
    const user = await userModel.findOne({ email: email });
    if (user && this.comparePassword(password, user.password)) {
      const user2 = user.toObject();
      delete user2.password;
      return user2 as any as IUser;
    } else {
      return null;
    }
  }

  async resetPassword(id: string, password: string): Promise<void> {
    const hash = this.hashPassword(password);
    await userModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), { password: hash });
  }

}

export default new UserService();