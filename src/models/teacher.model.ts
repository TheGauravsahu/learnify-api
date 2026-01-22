import mongoose from "mongoose";

export interface ITeacher extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  subjects: mongoose.Types.ObjectId[];
  classes: mongoose.Types.ObjectId[];
  name: string;
  phone: string;
  address: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  qualification: string;
  experience: number;
}

const teacherSchema = new mongoose.Schema<ITeacher>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",
        required: true,
      },
    ],
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classes",
      },
    ],
    qualification: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

export const teacherModel = mongoose.model<ITeacher>("teachers", teacherSchema);
