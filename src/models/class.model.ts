import mongoose from "mongoose";

export interface IClass extends mongoose.Document {
  name: string;
  section: string;
  academicYear: string;
  classTeacher?: mongoose.Types.ObjectId;
}

const classSchema = new mongoose.Schema<IClass>(
  {
    name: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teachers",
    },
  },
  { timestamps: true }
);

export const classModel = mongoose.model<IClass>("classes", classSchema);
