import { BaseModel } from "../BaseModel";
import { Address, IAddress } from "../common/IAddress";

export class UserModel extends BaseModel {
  constructor(
      _id: string | null = null,
      public name: string = "",
      public email: string = "",
      public address: IAddress = new Address(),
      public active: boolean = true,
      public roles: string[] = ["user"],
    ) {
    super(_id);
  }
}