import { IUser } from "../models/userModel";
import { BaseController } from "./BaseController";
import userService from '../services/UserService';

class UserController extends BaseController<IUser> {
  constructor() { 
    super(userService);
  }
}

export default new UserController();