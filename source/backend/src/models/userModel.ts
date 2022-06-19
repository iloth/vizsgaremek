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

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minlength: [5, 'Minimum length is 5 but got {VALUE}.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    validate: {
      validator: function(value : string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: () => 'Not valid email.'
    },
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Minimum length is 8 but got {VALUE}.']
  },
  address: {
    zip: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    }
  },
  active: {
    type: Boolean
  },
  roles: {
    type: [String],
    enum: { 
      values: ['user', 'empl', 'admin'], 
      message: '{VALUE} is not valid role.'
    }
  }
});

export const userModel = mongoose.model<IUser>('User', userSchema);
