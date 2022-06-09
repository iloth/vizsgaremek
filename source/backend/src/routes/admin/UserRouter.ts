import { IUser } from "../../models/userModel";
import userController from "../../controllers/UserController";
import { BaseApiRouter } from "../BaseApiRouter";

class UserRouter extends BaseApiRouter<IUser> {
  constructor() {
    super(userController);
  }
}

export default new UserRouter();