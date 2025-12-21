import { attendanceModel } from "../models/attendance.model";
import mongoose from "mongoose";

interface AttendanceRecordInput {
  studentId: string;
  isPresent: boolean;
}

export interface ClassAttendanceInput {
  classId: string;
  date: string;
  records: AttendanceRecordInput[];
  markedBy: string;
}

class AttendanceService {
  async markAttendance(input: ClassAttendanceInput) {
    const operations = input.records.map((record) => ({
      updateOne: {
        filter: {
          studentId: new mongoose.Types.ObjectId(record.studentId),
          date: input.date,
        },
        update: {
          $set: {
            classId: input.classId,
            isPresent: record.isPresent,
            markedBy: new mongoose.Types.ObjectId(input.markedBy),
          },
        },
        upsert: true,
      },
    }));

    await attendanceModel.bulkWrite(operations);
    return true;
  }

  async getAttendance(classId: string, date: string) {
    return await attendanceModel.find({ classId, date });
  }
}

export const attendanceService = new AttendanceService();
