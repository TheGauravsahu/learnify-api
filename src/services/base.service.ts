import { Model, Types } from "mongoose";

export class BaseService<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>) {
    return this.model.create(data as any);
  }

  async getAll(filter: any = {}, options: any = {}) {
    return this.model.find(filter, null, options);
  }

  async getById(id: string | Types.ObjectId) {
    return this.model.findById(id);
  }

  async update(id: string | Types.ObjectId, data: Partial<T>) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string | Types.ObjectId) {
    return this.model.findByIdAndDelete(id);
  }
}
