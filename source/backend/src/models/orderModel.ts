import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  orderDate: Date;
  status: string;
  amount: number;
  completeDate: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: [true, 'Order date is required.']
  },
  status: {
    type: String,
    default: 'ordered',
    enum: { values: ['ordered', 'inprogress', 'completed'], message: 'Not valid status: {VALUE}.'},
    required: [ true, 'Status is required']
  },
  amount: {
    type: Number,
    min: [0, 'Amount is must be pozitiv.'],
    required: [true, 'Amount is required'],  
  },
  completeDate: {
    type: Date
  }
});

export const orderModel = mongoose.model<IOrder>('Order', orderSchema);
