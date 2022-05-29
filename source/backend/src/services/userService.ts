import { IUser, userModel } from '../models/userModel';

export async function create(user: IUser): Promise<IUser> {
  const newDoc = new userModel(user);
  await newDoc.save();
  return newDoc;
};

export async function getAll(): Promise<IUser[]> {
  return await userModel.find();
}
