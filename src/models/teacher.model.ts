import mongoose from "mongoose";

export interface ITeacher extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  subject: string;
  experience: number;
}

const teacherSchema = new mongoose.Schema<ITeacher>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    subject: { type: String, required: true },
    experience: { type: Number, required: true },
  },
  { timestamps: true }
);

export const teacherModel = mongoose.model<ITeacher>("teachers", teacherSchema);
