import mongoose, { Document, Schema } from "mongoose";

export interface IFavourite extends Document {
  userId?: string;
  name: string;
  burgerParts: string[];
  notes: string;
}

const favouriteSchema = new Schema<IFavourite>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [10, 'Minimum length is 10']
  },
  burgerParts: {
  },
  notes: {
    type: String
  }
});

export const favouriteModel = mongoose.model<IFavourite>('Favourite', favouriteSchema);
