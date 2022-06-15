import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IBurgerPart extends Document {
  name: string;
  description: string;
  image: ObjectId;
  price: number;
  category: "bun" | "meat" | "cheese" | "vegetable" | "sauce" | "extra" | "other";
  freeFrom: string[]; //gluten, lactose, sugar
  vegan: "no" | "vegetarian" | "vegan";
  hot: number;
  status: "ok" | "tna" | "na";
  defaultPlace: number;
}

//TODO: validation
const burgerPartSchema = new Schema<IBurgerPart>({
  name: String,
  description: String,
  image: mongoose.Types.ObjectId,
  price: Number,
  category: String,
  freeFrom: [String],
  vegan: String,
  hot: Number,
  status: String,
  defaultPlace: Number

});

export const burgerPartModel = mongoose.model<IBurgerPart>('BurgerPart', burgerPartSchema);
