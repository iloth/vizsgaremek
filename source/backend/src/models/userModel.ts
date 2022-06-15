import mongoose, { Document, Schema } from "mongoose";
import { IAddress } from "./IAddress";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address: IAddress;
  active: boolean;
  roles: string[];
}

//TODO: validation
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  address: {
    zip: String,
    city: String,
    address: String
  },
  active: Boolean,
  roles: [String]
});

export const userModel = mongoose.model<IUser>('User', userSchema);
