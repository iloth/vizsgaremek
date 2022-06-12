import { IUser } from "../models/userModel";
import { BaseApiController } from "./BaseApiController";
import userService from '../services/UserService';

class UserController extends BaseApiController<IUser> {
  constructor() { 
    super(userService);
  }
}

export default new UserController();