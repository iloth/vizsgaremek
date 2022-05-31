import mongoose from 'mongoose';
import { IUser, userModel } from '../models/userModel';

export async function getAll(): Promise<IUser[]> {
  return await userModel.find();
}

export async function get(id: string): Promise<IUser | null> {
  return await userModel.findById(new mongoose.Types.ObjectId(id));
}

export async function create(user: IUser): Promise<IUser> {
  const newDoc = new userModel(user);
  await newDoc.save();
  return newDoc;
}

export async function update(id: string, user: IUser): Promise<IUser | null> {
  await userModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), user);
  return await userModel.findById(new mongoose.Types.ObjectId(id));
}

export async function remove(id: string): Promise<void> {
  await userModel.findByIdAndDelete(new mongoose.Types.ObjectId(id));
}