import { IUser, userModel } from "../models/userModel";
import { BaseService } from "./BaseService";

class UserService extends BaseService<IUser> {
  constructor() {
    super(userModel);
  }
}

export default new UserService();