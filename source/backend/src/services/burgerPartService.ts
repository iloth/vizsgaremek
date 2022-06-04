import mongoose from 'mongoose';
import { IBurgerPart, burgerPartModel } from '../models/burgerPartModel';

export async function getAll(): Promise<IBurgerPart[]> {
  return await burgerPartModel.find();
}

export async function get(id: string): Promise<IBurgerPart | null> {
  return await burgerPartModel.findById(new mongoose.Types.ObjectId(id));
}

export async function create(user: IBurgerPart): Promise<IBurgerPart> {
  delete user._id;
  const userDoc = new burgerPartModel(user);
  userDoc.isNew = true;
  await userDoc.save();
  return userDoc;
}

export async function update(id: string, user: IBurgerPart): Promise<IBurgerPart | null> {
  await burgerPartModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), user);
  return await burgerPartModel.findById(new mongoose.Types.ObjectId(id));
}

export async function remove(id: string): Promise<void> {
  await burgerPartModel.findByIdAndDelete(new mongoose.Types.ObjectId(id));
}