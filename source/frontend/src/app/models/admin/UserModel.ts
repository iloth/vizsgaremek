import { BaseModel } from "../BaseModel";
import { IAddress } from "../interfaces/AddressModel";

export class UserModel extends BaseModel {
  constructor(
      _id: string | null = null,
      public name: string,
      public email: string,
      public address: IAddress,
      public active: boolean,
      public roles: string[],
    ) {
    super(_id);
  }
}