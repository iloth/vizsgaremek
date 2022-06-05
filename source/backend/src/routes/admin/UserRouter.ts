import { IUser } from "../../models/userModel";
import userService from "../../services/UserService";
import { BaseApiRouter } from "../BaseApiRouter";

class UserRouter extends BaseApiRouter<IUser> {
  constructor() {
    super(userService);
  }
}

export default new UserRouter();