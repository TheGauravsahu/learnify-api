import mongoose from "mongoose";

export interface IStudent extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  class: mongoose.Types.ObjectId;
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
    class: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "classes",
    },
    rollNumber: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      default: "MALE",
      required: false,
    },
  },
  { timestamps: true }
);

export const studentModel = mongoose.model<IStudent>("students", studentSchema);
