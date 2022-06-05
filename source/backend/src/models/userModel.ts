import mongoose, { Document, Schema } from "mongoose";
import { IAddress } from "./addressModel";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address: IAddress;
  active: boolean;
  roles: string[];
}

export const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
  address: {
    zip: String,
    city: String,
    address: String
  },
  active: Boolean,
  roles: [String]
});

export const userModel = mongoose.model<IUser>('User', userSchema);
