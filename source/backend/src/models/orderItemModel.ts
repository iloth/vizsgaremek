import mongoose, { Document, Schema } from "mongoose";
import { IBurgerPart } from "./burgerPartModel";

export interface IOrderItem extends Document {
  orderId: string;
  favouriteId: string;
  burgerParts: IBurgerPart[];
  amount: number;
  notes: string;
}

const orderItemSchema = new Schema<IOrderItem>({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  favouriteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fav'
  },
  burgerParts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BurgerPart'
  }],
  amount: {
    type: Number,
    min: [0, 'Amount is must be pozitiv.'],
    required: [true, 'Amount is required'],  
  },
  notes: {
    type: String
  }
});

export const orderItemModel = mongoose.model<IOrderItem>('OrderItem', orderItemSchema);
