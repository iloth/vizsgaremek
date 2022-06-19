import { BaseModel } from "../BaseModel";

export class ResetPasswordModel extends BaseModel {
  constructor(
      _id: string | null = null,
      public password: string = ""
    ) {
    super(_id);
  }
}