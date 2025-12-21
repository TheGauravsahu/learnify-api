import mongoose from "mongoose";

interface IHomework extends mongoose.Document {
  description: string;
  subject: string;
  classId: string;
  dueDate: Date;
  teacherId: mongoose.Types.ObjectId;
}

const homeworkSchema = new mongoose.Schema<IHomework>(
  {
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    classId: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teachers",
      required: true,
    },
  },
  { timestamps: true }
);

export const homeworkModel = mongoose.model<IHomework>(
  "homeworks",
  homeworkSchema
);
