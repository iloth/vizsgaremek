import mongoose, { Document, UpdateQuery } from "mongoose";

export abstract class BaseApiService<Model extends Document> {
  constructor(
    private model: mongoose.Model<Model, {}, {}, {}>,
    private populates?: string[] 
  ) { }

  async getAll(): Promise<Model[]> {
    if (this.populates) {
      return await this.model.find().populate(this.populates);
    } else {
      return await this.model.find();
    }
  }

  async get(id: string): Promise<Model | null> {
    if (this.populates) {
      return await this.model.findById(new mongoose.Types.ObjectId(id)).populate(this.populates) as Model;
    } else {
      return await this.model.findById(new mongoose.Types.ObjectId(id));
    }
  }

  async create(entity: Model): Promise<Model> {
    delete entity._id;
    const userDoc = new this.model(entity);
    userDoc.isNew = true;
    await userDoc.save();
    return userDoc;
  }

  async update(id: string, entity: Model): Promise<Model | null> {
    await this.model.findByIdAndUpdate(new mongoose.Types.ObjectId(id), entity as any as UpdateQuery<Model>);
    return await this.model.findById(new mongoose.Types.ObjectId(id));
  }
  
  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(new mongoose.Types.ObjectId(id));
  }
}