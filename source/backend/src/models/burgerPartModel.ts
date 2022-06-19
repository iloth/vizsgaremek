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

const burgerPartSchema = new Schema<IBurgerPart>({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minlength: [5, 'Minimum length of name is 5.'],
    unique: true
  },
  description: {
    type: String
  },
  image: {
    type: mongoose.Types.ObjectId
  },
  price: {
    type: Number,
    min: [0, 'Minimum price is 0']
  },
  category: {
    type: String,
    enum: { values: ['bun', 'meat', 'cheese', 'vegetable', 'sauce', 'extra', 'other'], message: 'Not valid category value ({VALUE}).'}
  },
  freeFrom: {
    type: [String],
    enum: { values: ['gluten', 'lactose', 'sugar'], message: 'Not valid free from value ({VALUE}).'}
  },
  vegan: {
    type: String,
    enum: { values: ['no', 'vegetarian', 'vegan'], message: 'Not valid vegan value ({VALUE}).'}
  },
  hot: {
    type: Number,
    min: [0, 'Hot value must between 0 and 5'],
    max: [5, 'Hot value must between 0 and 5'],
  },
  status: {
    type: String,
    enum: { values: ['ok', 'tna', 'na'], message: 'Not valid status value.'}
  },
  defaultPlace: {
    type: Number,
    min: [1, 'Place value must between 1 and 100'],
    max: [100, 'Place value must between 1 and 100'],
  }

});

export const burgerPartModel = mongoose.model<IBurgerPart>('BurgerPart', burgerPartSchema);
