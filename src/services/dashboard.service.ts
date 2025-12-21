import { classModel } from "../models/class.model";
import { noticeModel } from "../models/notice.model";
import { studentModel } from "../models/student.model";
import { teacherModel } from "../models/teacher.model";

class DashboardService {
  async getAdminDashboard() {
    // TODO: add parents, staffs, events, etc.
    const [students, teachers, notices, classes] = await Promise.all([
      studentModel.countDocuments(),
      teacherModel.countDocuments(),
      noticeModel.countDocuments(),
      classModel.countDocuments(),
    ]);

    const genderAggregation = await studentModel.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 },
        },
      },
    ]);
    const genderStats = {
      boys: genderAggregation.find((g) => g._id === "MALE")?.count || 0,
      girls: genderAggregation.find((g) => g._id === "FEMALE")?.count || 0,
    };
    const latestNotices = await noticeModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      counts: {
        students,
        teachers,
        parents: 0, // TODO
        classes,
        notices,
      },
      genderStats,
      latestNotices,
    };
  }

  async getClassWiseStudentCount() {
    return studentModel.aggregate([
      {
        $group: {
          _id: "$class",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "_id",
          foreignField: "_id",
          as: "class",
        },
      },
      { $unwind: "$class" },
      {
        $project: {
          _id: 0,
          classId: "$class._id",
          className: {
            $concat: ["$class.name", "-", "$class.section"],
          },
          count: 1,
        },
      },
      { $sort: { className: 1 } },
    ]);
  }
}

export const dashboardService = new DashboardService();
