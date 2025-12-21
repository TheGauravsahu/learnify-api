import mongoose from "mongoose";

export interface INotice {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
}

const noticeSchema = new mongoose.Schema<INotice>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export const noticeModel = mongoose.model<INotice>("notices", noticeSchema);
