import { IUser, userModel } from "../models/userModel";
import { BaseApiService } from "./BaseApiService";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

class UserService extends BaseApiService<IUser> {
  constructor() {
    super(userModel);
  }

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
      return user;
    } else {
      return null;
    }
  }

  async resetPassword(id: string, password: string): Promise<void> {
    const hash = this.hashPassword(password);
    const user = await userModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), { password: hash });
  }

}

export default new UserService();