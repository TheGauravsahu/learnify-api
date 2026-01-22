import mongoose from "mongoose";

export const toObjectId = (id: string) => new mongoose.Types.ObjectId(id);

export interface GetModelParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}
