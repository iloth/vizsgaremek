import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IAddress } from "./addressModel";

export interface IBurgerPart extends Document {
  name: string;
  description: string;
  image: ObjectId;
  price: number;
  category: ObjectId;
  freeFrom: string[]; //gluten, lactose, sugar
  vegan: "no" | "vegetarian" | "vegan";
  hot: number;
  status: "ok" | "tna" | "na",
  defaultPlace: number;
}

const burgerPartSchema = new Schema<IBurgerPart>({
  name: String,
  description: String,
  image: mongoose.Types.ObjectId,
  price: Number,
  category: mongoose.Types.ObjectId,
  freeFrom: [String],
  vegan: String,
  hot: Number,
  status: String,
  defaultPlace: Number

});

export const burgerPartModel = mongoose.model<IBurgerPart>('BurgerPart', burgerPartSchema);
