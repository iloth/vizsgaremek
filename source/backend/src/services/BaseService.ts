import mongoose, { Document, UpdateQuery } from "mongoose";

export abstract class BaseService<T extends Document> {
  constructor(
    private model: mongoose.Model<T, {}, {}, {}> 
  ) { }

  async getAll(): Promise<T[]> {
    return await this.model.find();
  }

  async get(id: string): Promise<T | null> {
    return await this.model.findById(new mongoose.Types.ObjectId(id));
  }

  async create(entity: T): Promise<T> {
    delete entity._id;
    const userDoc = new this.model(entity);
    userDoc.isNew = true;
    await userDoc.save();
    return userDoc;
  }

  async update(id: string, entity: T): Promise<T | null> {
    await this.model.findByIdAndUpdate(new mongoose.Types.ObjectId(id), entity as any as UpdateQuery<T>);
    return await this.model.findById(new mongoose.Types.ObjectId(id));
  }
  
  async remove(id: string): Promise<void> {
    await this.model.findByIdAndDelete(new mongoose.Types.ObjectId(id));
  }
}