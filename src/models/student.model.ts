import mongoose from "mongoose";

export interface IStudent extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  class: string;
  section: string;
  rollNumber: number;
  gender: "MALE" | "FEMALE";
}

const studentSchema = new mongoose.Schema<IStudent>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    class: { type: String, required: true },
    section: { type: String, required: true },
    rollNumber: { type: Number, required: true },
    gender: { type: String, default: "MALE", required: false },
  },
  { timestamps: true }
);

export const studentModel = mongoose.model<IStudent>("students", studentSchema);
