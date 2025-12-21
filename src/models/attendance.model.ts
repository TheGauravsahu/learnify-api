import mongoose from "mongoose";

export interface IAttendance extends mongoose.Document {
  classId: string;
  isPresent: boolean;
  studentId: mongoose.Types.ObjectId;
  markedBy: mongoose.Types.ObjectId;
  date: string;
}

const attendanceSchema = new mongoose.Schema<IAttendance>(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    classId: { type: String, required: true },
    date: { type: String, required: true },
    isPresent: Boolean,
    markedBy: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

attendanceSchema.index(
  {
    studentId: 1,
    date: 1,
  },
  { unique: true }
);

attendanceSchema.index({
  classId: 1,
  date: 1,
});

export const attendanceModel = mongoose.model<IAttendance>(
  "attendances",
  attendanceSchema
);
